import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function verifyAdminSession() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return { authorized: false, user: null };
    }

    const userEmail = user.email.toLowerCase();
    const envAdminEmail = process.env.AUTHORIZED_ADMIN_EMAIL?.toLowerCase();

    // Check environment variable
    if (envAdminEmail && userEmail === envAdminEmail) {
      return { authorized: true, user };
    }

    // Check admin_users table
    const adminClient = createAdminClient();
    const { data: adminRecord } = await adminClient
      .from("admin_users")
      .select("email")
      .eq("email", userEmail)
      .maybeSingle();

    return { authorized: Boolean(adminRecord), user };
  } catch (err) {
    console.error("verifyAdminSession error:", err);
    return { authorized: false, user: null };
  }
}
