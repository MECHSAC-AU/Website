"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ContributorCard from "@/components/ContributorCard";
import { siteConfig } from "@/data/siteConfig";
import { contributorsData } from "@/data/contributors";
import {
  Heart,
  Search,
  CheckCircle,
  Building,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function ContributorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Clean placeholder examples when actual information is unavailable
  const placeholderCards = [
    {
      id: "placeholder-faculty",
      name: "Faculty Member",
      role: "Faculty",
      designation: "Professor / Academic Mentor",
      department: "Dept. of Mechanical Engineering",
      organization: "Aliah University",
      contributionMessage:
        "Supporting student hands-on vehicle prototyping, laboratory fabrication, and CAD simulation licensing.",
      year: "2026",
    },
    {
      id: "placeholder-mentor",
      name: "Industry Mentor",
      role: "Mentor",
      designation: "Senior Automotive Engineer",
      department: "Automotive & Motorsports Sector",
      organization: "Industry",
      contributionMessage:
        "Providing engineering guidance, dynamic testing advice, and motorsport safety standards.",
      year: "2026",
    },
    {
      id: "placeholder-supporter",
      name: "Individual Supporter",
      role: "Individual Supporter",
      designation: "Alumni / Supporter",
      department: "Aliah University Community",
      organization: "Friend of MECHSAC",
      contributionMessage:
        "Directly funding chassis tubing, precision fasteners, and student safety gear.",
      year: "2026",
    },
  ];

  // Filter contributors by search query only (no categories)
  const filteredContributors = contributorsData.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contributionMessage?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0b0c12] overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.25) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-racing-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-racing-500">
                PATRONAGE // EST. {siteConfig.establishedYear}
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              OUR <br />
              <span className="text-racing-500">CONTRIBUTORS.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Recognizing the faculty members, mentors, and supporters whose financial
              contributions empower our student engineers at {siteConfig.universityName}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Subpage Quick Navigation Tabs */}
      <section className="py-6 border-b border-[#1b1f2e] bg-[#08090C] sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link
                href="/sponsors"
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm bg-[#11141e] text-slate-300 hover:text-white border border-[#212638] hover:border-slate-500 transition-colors"
              >
                Our Sponsors
              </Link>
              <Link
                href="/sponsors/contributors"
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm bg-racing-600 text-white border border-racing-500 shadow-[0_0_12px_rgba(225,29,72,0.35)] flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Our Contributors</span>
              </Link>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-racing-500" />
              <span>DEPARTMENT OF MECHANICAL ENGINEERING</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contributors Showcase Section (No Categories) */}
      <section className="py-16 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar when contributors exist */}
          {contributorsData.length > 0 && (
            <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1b1f2e]">
              <div className="text-xs font-mono text-slate-400">
                SHOWING {filteredContributors.length} CONTRIBUTOR{filteredContributors.length === 1 ? "" : "S"}
              </div>
              <div className="relative w-full max-w-xs">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search contributor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#121520] border border-[#23283c] focus:border-racing-500 rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Contributors Grid or Clean Placeholders */}
          {filteredContributors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContributors.map((c) => (
                <ContributorCard key={c.id} contributor={c} />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Informative Notice */}
              <div className="p-8 sm:p-12 rounded-sm bg-[#0e1018] border border-[#212638] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-racing-500/10 border border-racing-500/30 text-racing-500 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <div className="inline-block px-3 py-1 rounded bg-[#151926] border border-[#252c3e] font-mono text-[10px] text-racing-400 uppercase tracking-widest font-semibold mb-3">
                  INAUGURAL SEASON // EST. {siteConfig.establishedYear}
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Our Contributors
                </h2>
                <p className="mt-4 font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
                  {siteConfig.clubName} was established in {siteConfig.establishedYear} under the {siteConfig.departmentName} at {siteConfig.universityName}. Faculty members, mentors, and individual supporters who contribute to our organization and vehicle projects will be displayed here.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
                  To ensure complete transparency, supporter profiles, designations, and contribution messages are officially published once received.
                </p>
              </div>

              {/* Clean Placeholders Demonstrating Profile Cards */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block">
                      // PROFILE CARDS
                    </span>
                    <h3 className="font-sans text-xl font-bold text-white uppercase mt-0.5">
                      Supporter Profiles
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500">
                    CLEAN PLACEHOLDER TEMPLATES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placeholderCards.map((card) => (
                    <ContributorCard
                      key={card.id}
                      contributor={card}
                      isPlaceholder={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Direct Impact Overview (No CTA) */}
      <section className="py-20 bg-[#0c0d14] border-t border-[#1b1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-sm bg-[#0e1018] border border-[#212638]">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block">
                // PROJECT ALLOCATION
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white uppercase">
                Supporting Student Automotive Innovation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Financial contributions received by MECHSAC directly fund chassis raw materials, precision fasteners, dynamometer testing sessions, electric vehicle battery electronics, and student safety suits across our 13 departmental laboratories at {siteConfig.universityName}.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-racing-500" />
                  <span>13 Departmental Laboratories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-racing-500" />
                  <span>110+ Student Engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-racing-500" />
                  <span>Formula Student &amp; EV Prototyping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
