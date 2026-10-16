"use client";

import { ArrowRight, Cpu, Layers } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProjectCard({ project, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(project)}
      className="group relative flex flex-col bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(225,29,72,0.15)] cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0e14]">
        <ImagePlaceholder
          src={project.heroImage}
          alt={project.title}
          aspectRatio="aspect-[16/10]"
          type="car"
          label={`PROJ-${project.number || "01"}`}
          sublabel={project.category}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-white px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 uppercase">
            {project.number || "01"}
          </span>
          <span className="font-mono text-[10px] font-semibold text-racing-400 px-2 py-0.5 rounded bg-racing-950/80 backdrop-blur-md border border-racing-500/40 uppercase">
            {project.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="font-mono text-[9px] text-slate-300 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 uppercase">
            {project.status || "Active"}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Year & Metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span>SEASON // {project.year}</span>
            <span className="group-hover:text-racing-500 transition-colors">
              SPEC-ID: {project.id}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-sans text-lg font-bold text-white uppercase group-hover:text-racing-400 transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Tagline / Description */}
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {project.tagline || project.description}
          </p>

          {/* Tech tags preview */}
          {project.technologies && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] text-slate-300 bg-[#161a27] border border-[#23283c] px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="font-mono text-[10px] text-slate-500 px-1 py-0.5">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-5 pt-3.5 border-t border-[#1a1e2d] flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
          <span className="font-mono text-[11px] uppercase tracking-wider text-racing-500 group-hover:translate-x-0.5 transition-transform">
            View Technical Specs
          </span>
          <ArrowRight className="w-4 h-4 text-racing-500 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
