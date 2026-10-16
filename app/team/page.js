"use client";

import { useState } from "react";
import { membersData, memberCategories } from "@/data/members";
import MemberCard from "@/components/MemberCard";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Users, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers =
    activeCategory === "All"
      ? membersData
      : membersData.filter((member) => member.category === activeCategory);

  return (
    <div className="pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0b0c12] overflow-hidden">
        {/* Subtle grid bg */}
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
                TEAM DIRECTORY // 2026 SEASON
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              THE PEOPLE <br />
              <span className="text-racing-500">BEHIND THE MACHINES.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Meet the student aerodynamicists, chassis fabricators, powertrain specialists,
              telemetry coders, and team principals driving our engineering program.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Directory & Filters */}
      <section className="py-16 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-start gap-2 mb-12 pb-6 border-b border-[#1b1f2e]">
            <div className="flex items-center gap-2 mr-3 text-xs font-mono text-slate-400">
              <Filter className="w-3.5 h-3.5 text-racing-500" />
              <span>DIVISIONS:</span>
            </div>
            {memberCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 ${
                    isActive
                      ? "bg-racing-600 text-white border border-racing-500 shadow-[0_0_15px_rgba(225,29,72,0.35)]"
                      : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638] hover:border-slate-500"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Empty state safeguard */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-20 p-8 rounded bg-[#10121b] border border-[#212638]">
              <p className="font-mono text-sm text-slate-400">
                No active members found in this division.
              </p>
            </div>
          )}

          {/* 3. Recruitment Callout */}
          <div className="mt-20 p-8 sm:p-12 rounded-sm bg-gradient-to-r from-[#11141e] to-[#0c0d14] border border-[#262c3e] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-2">
                // STUDENT RECRUITMENT
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white uppercase">
                Want to engineer with us?
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-xl font-light">
                Recruitment cycles open each semester for mechanical, electrical, computer science,
                and business students. No prior motorsport experience required — only curiosity,
                work ethic, and passion for engineering.
              </p>
            </div>

            <Button href="/contact#join" variant="primary" size="lg" className="shrink-0">
              Apply For Next Intake
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
