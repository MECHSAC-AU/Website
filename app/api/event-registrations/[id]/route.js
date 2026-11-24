import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin";
import {
  sendEventRegistrationApprovalEmail,
  sendEventRegistrationRejectionEmail,
} from "@/lib/email/resend";

export async function PATCH(request, { params }) {
  const { authorized } = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const body = await request.json();
    const { status, admin_notes } = body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch existing registration details
    const { data: existingReg, error: fetchErr } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !existingReg) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Update status in DB
    const { data: updatedReg, error: updateErr } = await supabase
      .from("event_registrations")
      .update({
        status,
        admin_notes: admin_notes !== undefined ? admin_notes : existingReg.admin_notes,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // Fetch event details to provide rich info in the confirmation email
    let eventDate = "Dates will be announced";
    let eventLocation = "Department of Mechanical Engineering, Aliah University";

    if (existingReg.event_id) {
      const { data: evt } = await supabase
        .from("events")
        .select("date, location, time")
        .eq("id", existingReg.event_id)
        .maybeSingle();

      if (evt) {
        eventDate = evt.date ? `${evt.date}${evt.time ? ` (${evt.time})` : ""}` : eventDate;
        eventLocation = evt.location || eventLocation;
      }
    }

    // Trigger automated email on approval or rejection
    let emailResult = null;
    if (status === "approved" && existingReg.status !== "approved") {
      emailResult = await sendEventRegistrationApprovalEmail({
        to: existingReg.email,
        name: existingReg.name,
        eventTitle: existingReg.event_title,
        eventDate,
        eventLocation,
      });
    } else if (status === "rejected" && existingReg.status !== "rejected") {
      emailResult = await sendEventRegistrationRejectionEmail({
        to: existingReg.email,
        name: existingReg.name,
        eventTitle: existingReg.event_title,
      });
    }

    return NextResponse.json({
      success: true,
      registration: updatedReg,
      emailSent: Boolean(emailResult?.success),
      forwardedToAdmin: Boolean(emailResult?.forwardedToAdmin),
      emailError: emailResult?.error || null,
    });
  } catch (err) {
    console.error("Error updating event registration:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { authorized } = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("event_registrations").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
