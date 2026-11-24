import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin";

export async function GET() {
  const { authorized } = await verifyAdminSession();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const members = (data || []).map((m) => ({
      ...m,
      specialization: m.specialization || m.focus || "",
      focus: m.specialization || m.focus || "",
      linkedin: m.social?.linkedin || m.linkedin || "",
      email: m.social?.email || m.email || "",
      social: {
        linkedin: m.social?.linkedin || m.linkedin || "",
        email: m.social?.email || m.email || "",
        github: m.social?.github || m.github || "",
      },
    }));

    return NextResponse.json({ members });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { authorized } = await verifyAdminSession();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const id = body.id || `mem-${Date.now()}`;
    const linkedinUrl = body.linkedin !== undefined ? body.linkedin : (body.social?.linkedin || "");
    const emailAddress = body.email !== undefined ? body.email : (body.social?.email || "");

    const social = {
      ...(body.social || {}),
      linkedin: linkedinUrl,
      email: emailAddress,
      github: body.github || body.social?.github || "",
    };

    const payload = {
      id,
      name: body.name || "",
      role: body.role || "",
      category: body.category || "Core Team",
      department: body.department || "",
      year: body.year || "",
      specialization: body.specialization || body.focus || "",
      bio: body.bio || "",
      image: body.image || "",
      display_order: Number(body.display_order) || 0,
      social,
    };

    const { data, error } = await supabase
      .from("members")
      .insert([payload])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const formattedMember = {
      ...data,
      specialization: data.specialization || "",
      focus: data.specialization || "",
      linkedin: data.social?.linkedin || "",
      email: data.social?.email || "",
    };

    return NextResponse.json({ member: formattedMember }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
