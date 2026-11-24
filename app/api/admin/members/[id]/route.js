import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin";

export async function PUT(request, { params }) {
  const { authorized } = await verifyAdminSession();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Fetch existing member to preserve social links if not explicitly provided
    const { data: existing } = await supabase
      .from("members")
      .select("social")
      .eq("id", id)
      .maybeSingle();

    const existingSocial = existing?.social || {};
    const linkedinUrl =
      body.linkedin !== undefined
        ? body.linkedin
        : body.social?.linkedin !== undefined
        ? body.social.linkedin
        : existingSocial.linkedin || "";
    const emailAddress =
      body.email !== undefined
        ? body.email
        : body.social?.email !== undefined
        ? body.social.email
        : existingSocial.email || "";

    const social = {
      ...existingSocial,
      ...(body.social || {}),
      linkedin: linkedinUrl,
      email: emailAddress,
    };

    const payload = {
      name: body.name,
      role: body.role,
      category: body.category,
      department: body.department,
      year: body.year,
      specialization: body.specialization || body.focus,
      image: body.image,
      bio: body.bio,
      display_order: body.display_order !== undefined ? Number(body.display_order) : undefined,
      social,
    };

    // Clean undefined fields so we don't overwrite with null unless intended
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from("members")
      .update(payload)
      .eq("id", id)
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

    return NextResponse.json({ member: formattedMember });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { authorized } = await verifyAdminSession();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
