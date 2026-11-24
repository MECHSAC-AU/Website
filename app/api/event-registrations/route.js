import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { event_id, event_title, name, email } = body;

    if (!name || !email || !event_id) {
      return NextResponse.json(
        { error: "Event ID, name, and email are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id,
          event_title: event_title || "MECHSAC Event",
          name: name.trim(),
          email: email.trim().toLowerCase(),
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error (event_registrations):", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, registration: data }, { status: 201 });
  } catch (err) {
    console.error("Event registration error:", err);
    return NextResponse.json(
      { error: "Internal server error registering for event." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { authorized } = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ registrations: data || [] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
