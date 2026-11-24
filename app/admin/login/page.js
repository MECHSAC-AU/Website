"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/data/siteConfig";
import { Shield, Github, AlertTriangle, ArrowLeft, CheckCircle2, Lock } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const emailParam = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorParam === "unauthorized") {
      setErrorMessage(
        emailParam
          ? `Access Denied: The GitHub account (${emailParam}) is not on the MECHSAC authorized admin allowlist.`
          : "Access Denied: Your GitHub account is not on the authorized admin allowlist."
      );
    } else if (errorParam === "auth_failed") {
      setErrorMessage("Authentication failed. Please verify your GitHub authorization and try again.");
    } else if (errorParam === "no_email") {
      setErrorMessage("Unable to retrieve email from your GitHub account. Ensure your primary email is verified on GitHub.");
    } else if (errorParam === "server_error") {
      setErrorMessage("Internal verification error. Please ensure database tables are deployed in Supabase.");
    }
  }, [errorParam, emailParam]);

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const supabase = createClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${origin}/auth/callback?next=/admin`,
          scopes: "read:user user:email",
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Login initiation error:", err);
      setErrorMessage(err.message || "Failed to initiate GitHub authentication.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#08090C] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.25) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-[#0f1118] border border-[#212638] rounded-sm p-8 sm:p-10 shadow-2xl">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Site</span>
          </Link>
        </div>

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-racing-500/10 border border-racing-500/30 text-racing-500 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
            <Shield className="w-7 h-7" />
          </div>
          <span className="font-mono text-[10px] text-racing-400 uppercase tracking-widest font-semibold block mb-1">
            CONTROL TOWER // SECURE AUTH
          </span>
          <h1 className="font-sans text-2xl font-black text-white uppercase tracking-tight">
            MECHSAC Admin Portal
          </h1>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed font-light">
            Authorized administrative access for {siteConfig.departmentName}, {siteConfig.universityName}.
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded bg-racing-950/70 border border-racing-500/60 flex items-start gap-3 text-xs text-racing-200 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-racing-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-4">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-sm bg-[#161a27] hover:bg-[#1e2335] text-white border border-[#2b334a] hover:border-racing-500 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md group disabled:opacity-50"
          >
            <Github className="w-4 h-4 text-white group-hover:text-racing-400 transition-colors" />
            <span>{isLoading ? "Connecting to GitHub..." : "Sign In with GitHub"}</span>
          </button>

          <div className="p-3.5 rounded bg-[#131724] border border-[#212638] text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Lock className="w-3.5 h-3.5 text-racing-500" />
              <span>Allowlist Protected</span>
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Only GitHub accounts registered in the database allowlist can access the dashboard.
            </p>
            <div className="pt-1 text-[10px] text-slate-500">
              Primary Admin: <span className="text-racing-400">{process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAIL || "mechsac.au@gmail.com"}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-[#1b1f2e] text-center font-mono text-[10px] text-slate-500">
          SYSTEM: MECHSAC-ADMIN-AUTH // 2026
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center bg-[#08090C] text-slate-400 font-mono text-xs">
          Loading Admin Portal Authentication...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
