"use client";

import { useRef, useState } from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsCarousel() {
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400 uppercase">
            ACTIVE FLEET // {projectsData.length} PROTOTYPES
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 rounded bg-[#131724] border border-[#23283c] text-slate-300 hover:text-white hover:border-racing-500 transition-colors"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 rounded bg-[#131724] border border-[#23283c] text-slate-300 hover:text-white hover:border-racing-500 transition-colors"
            aria-label="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-start"
          >
            <ProjectCard
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          </div>
        ))}
      </div>

      {/* Modal for viewing project specs */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
