"use client";

import { User, Building, Quote, Linkedin, Heart } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ContributorCard({ contributor, isPlaceholder = false }) {
  const hasPhoto = Boolean(contributor?.photo);

  return (
    <div
      className={`group relative bg-[#0f1118] border rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between ${
        isPlaceholder
          ? "border-dashed border-[#2b334a] bg-[#0d0f17]/90"
          : "border-[#212638] hover:border-racing-500/70 hover:shadow-[0_12px_30px_rgba(225,29,72,0.12)]"
      }`}
    >
      {/* Visual / Avatar Area */}
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#0c0e14] flex items-center justify-center">
        {hasPhoto ? (
          <ImagePlaceholder
            src={contributor.photo}
            alt={contributor.name}
            aspectRatio="aspect-[4/4.5]"
            type="faculty"
            label={contributor.role ? contributor.role.toUpperCase() : "CONTRIBUTOR"}
            sublabel={contributor.year || "2026"}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#131622] to-[#0a0c12]">
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-racing-500/70 pointer-events-none" />
            <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-racing-500/70 pointer-events-none" />
            <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-racing-500/70 pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-racing-500/70 pointer-events-none" />

            {/* Subtle background tech grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.3) 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* High-tech Avatar Circle */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#161a27] border-2 border-[#2b334a] group-hover:border-racing-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(225,29,72,0.3)]">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 group-hover:text-racing-400 transition-colors" />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-racing-600 text-white shadow-md">
                <Heart className="w-3 h-3 fill-current" />
              </div>
            </div>

            <span className="mt-3 font-mono text-[10px] text-slate-500 tracking-widest uppercase">
              // CONTRIBUTOR
            </span>
          </div>
        )}

        {/* Role Tag Overlay */}
        {contributor.role && (
          <div className="absolute top-3 left-3 z-20">
            <span className="font-mono text-[9px] font-semibold text-white px-2 py-0.5 rounded bg-racing-950/80 backdrop-blur-md border border-racing-500/50 uppercase">
              {contributor.role}
            </span>
          </div>
        )}

        {/* Corner notch */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-racing-600/40 clip-path-notch" />
      </div>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Eyebrow */}
          <div className="font-mono text-[10px] text-racing-500 uppercase tracking-widest font-semibold mb-1">
            {contributor.role ? `${contributor.role.toUpperCase()}` : "CONTRIBUTOR"}
          </div>

          {/* Contributor Name */}
          <h3 className="font-sans text-lg font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
            {contributor.name}
          </h3>

          {/* Designation / Role */}
          {contributor.designation && (
            <p className="text-xs font-semibold text-slate-300 mt-1">
              {contributor.designation}
            </p>
          )}

          {/* Department or Organization (optional) */}
          {(contributor.department || contributor.organization) && (
            <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-400">
              <Building className="w-3.5 h-3.5 text-racing-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                {contributor.department}
                {contributor.department && contributor.organization && " • "}
                {contributor.organization}
              </span>
            </div>
          )}

          {/* Short description or contribution message (optional) */}
          {contributor.contributionMessage && (
            <blockquote className="mt-3.5 p-3 rounded bg-[#131724] border-l-2 border-racing-500 text-xs text-slate-300 italic leading-relaxed">
              &ldquo;{contributor.contributionMessage}&rdquo;
            </blockquote>
          )}
        </div>

        {/* Footer info & Links */}
        <div className="mt-5 pt-3 border-t border-[#1b1f2e] flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-slate-500 uppercase">
            {contributor.year ? `CONTRIBUTOR // ${contributor.year}` : "CONTRIBUTOR"}
          </span>

          {contributor.social?.linkedin && (
            <a
              href={contributor.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-racing-500" />
              <span>Connect</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
