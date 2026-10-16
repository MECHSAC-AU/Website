"use client";

import { useEffect } from "react";
import { X, CheckCircle, Cpu, Calendar, User, Gauge } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import Button from "./Button";

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0f17] border border-[#262c3e] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 text-white">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0d0f17]/95 backdrop-blur-md border-b border-[#212638]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-racing-500 uppercase px-2 py-0.5 rounded bg-racing-500/10 border border-racing-500/30">
              PROJ // {project.number || "01"}
            </span>
            <span className="font-mono text-xs text-slate-400 uppercase">
              STATUS: {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#171b28] border border-[#282f44] text-slate-400 hover:text-white hover:border-racing-500 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Visual */}
          <div className="relative rounded overflow-hidden">
            <ImagePlaceholder
              src={project.heroImage}
              alt={project.title}
              aspectRatio="aspect-[16/9]"
              type="car"
              label={`SPEC-PROJ-${project.number || "01"}`}
              sublabel={project.category}
              priority
            />
          </div>

          {/* Title & Category */}
          <div className="border-b border-[#1f2436] pb-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="font-mono text-xs font-semibold text-racing-400 uppercase">
                {project.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-xs text-slate-400">
                SEASON {project.year}
              </span>
            </div>
            <h3 className="font-sans text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          {project.specs && project.specs.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-racing-500" />
                Technical Specifications & Benchmarks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded bg-[#131622] border border-[#212638] flex flex-col justify-between"
                  >
                    <span className="font-mono text-[11px] text-slate-400 uppercase">
                      {spec.label}
                    </span>
                    <span className="font-sans text-base font-bold text-white mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-racing-500" />
                Engineering Innovations
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-racing-500 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {project.technologies && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-racing-500" />
                Software & Toolchains
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-slate-300 bg-[#161a27] border border-[#252c40] px-3 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Team Lead & Actions */}
          <div className="pt-4 border-t border-[#1f2436] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <User className="w-4 h-4 text-racing-500" />
              <span>LEAD ENGINEERS: {project.teamLead || "Alex Morgan"}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                href="/contact"
                className="w-full sm:w-auto"
                onClick={onClose}
              >
                Inquire With Engineering Team
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Close Spec
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
