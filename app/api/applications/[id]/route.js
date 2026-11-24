import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin";
import {
  sendApplicationApprovalEmail,
  sendApplicationRejectionEmail,
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

    // Fetch existing application details
    const { data: existingApp, error: fetchErr } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !existingApp) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Update status in DB
    const { data: updatedApp, error: updateErr } = await supabase
      .from("applications")
      .update({
        status,
        admin_notes: admin_notes !== undefined ? admin_notes : existingApp.admin_notes,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // Trigger automated email on approval or rejection
    let emailResult = null;
    if (status === "approved" && existingApp.status !== "approved") {
      emailResult = await sendApplicationApprovalEmail({
        to: existingApp.email,
        name: existingApp.name,
        interest: existingApp.interest,
      });
    } else if (status === "rejected" && existingApp.status !== "rejected") {
      emailResult = await sendApplicationRejectionEmail({
        to: existingApp.email,
        name: existingApp.name,
      });
    }

    return NextResponse.json({
      success: true,
      application: updatedApp,
      emailSent: Boolean(emailResult?.success),
      forwardedToAdmin: Boolean(emailResult?.forwardedToAdmin),
      emailError: emailResult?.error || null,
    });
  } catch (err) {
    console.error("Error updating application:", err);
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
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
