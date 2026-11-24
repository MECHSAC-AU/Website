import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/admin";

  if (code) {
    const supabase = createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Auth session exchange error:", sessionError);
      return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
    }

    // Get current authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.redirect(`${origin}/admin/login?error=no_email`);
    }

    // Verify user is in admin allowlist
    try {
      const adminClient = createAdminClient();
      const userEmail = user.email.toLowerCase();

      // Check allowlist table
      const { data: adminRecord } = await adminClient
        .from("admin_users")
        .select("email")
        .eq("email", userEmail)
        .maybeSingle();

      const envAdminEmail = process.env.AUTHORIZED_ADMIN_EMAIL?.toLowerCase();
      const isAuthorized = Boolean(adminRecord) || (envAdminEmail && userEmail === envAdminEmail);

      if (!isAuthorized) {
        // Sign user out if not an authorized admin
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/admin/login?error=unauthorized&email=${encodeURIComponent(user.email)}`
        );
      }

      // If user is authorized via env variable but not in DB yet, seed into DB
      if (isAuthorized && !adminRecord) {
        await adminClient.from("admin_users").insert({
          email: userEmail,
          github_username: user.user_metadata?.user_name || user.user_metadata?.preferred_username || null,
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    } catch (err) {
      console.error("Admin allowlist verification error:", err);
      return NextResponse.redirect(`${origin}/admin/login?error=server_error`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=no_code`);
}
