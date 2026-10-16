"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090cd9] backdrop-blur-md border-b border-[#212638] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#08090ce6] via-[#08090cb3] to-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Club Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Automobile Club Home"
          >
            {/* Logo Emblem Placeholder */}
            <div className="relative w-10 h-10 rounded-sm bg-[#131622] border border-[#2a3044] group-hover:border-racing-500/80 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(225,29,72,0.1)] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <img src="" alt="Club Logo" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-racing-500 rotate-45" />
            </div>

            <div className="flex flex-col">
              <span className="font-sans text-sm font-extrabold tracking-wider text-white uppercase group-hover:text-racing-400 transition-colors">
                {siteConfig.clubName}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase">
                DEPT OF MECHANICAL ENG.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-sm ${
                    isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-racing-600 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact#join"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-racing-600 hover:bg-racing-700 border border-racing-500/60 rounded-sm shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_22px_rgba(225,29,72,0.5)] transition-all duration-300 group"
            >
              <span>Join the Club</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contact#join"
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-racing-600 rounded-sm"
            >
              Join
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-sm bg-[#141722] border border-[#232738] focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-racing-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[#08090cf2] backdrop-blur-2xl border-t border-[#212638] flex flex-col justify-between p-6 lg:hidden overflow-y-auto animate-fade-in">
          {/* Header Metadata */}
          <div className="py-2 border-b border-[#1b1f2e] mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-racing-500 animate-pulse" />
              <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                {siteConfig.universityName}
              </span>
            </div>
            <span className="font-mono text-[10px] text-racing-500">
              SYS // ACTIVE
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-3 text-base font-bold uppercase tracking-wider rounded-sm transition-colors ${
                    isActive
                      ? "text-white bg-[#151824] border-l-4 border-racing-600"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? "text-racing-500" : "text-slate-600"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Bottom Actions & Details */}
          <div className="mt-8 pt-6 border-t border-[#1e2334] space-y-4">
            <Link
              href="/contact#join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-racing-600 hover:bg-racing-700 rounded-sm shadow-[0_0_20px_rgba(225,29,72,0.4)]"
            >
              <span>Join The Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-3 rounded bg-[#0f1118] border border-[#1b1f2e] text-center">
              <p className="font-mono text-[10px] text-slate-400">
                {siteConfig.subTitle}
              </p>
              <p className="font-mono text-[9px] text-slate-600 mt-1">
                LOCATION: {siteConfig.location.workshop}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
