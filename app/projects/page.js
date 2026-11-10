"use client";

import { useState } from "react";
import { projectsData, projectCategories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Filter, Search, Wrench, Clock, Layers, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects by category and search query
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
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
                ENGINEERING FLEET // EST. {siteConfig.establishedYear}
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              PROJECTS ARE <br />
              <span className="text-racing-500">COMING SOON...</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Established in {siteConfig.establishedYear} under the {siteConfig.departmentName} at{" "}
              {siteConfig.universityName}, our team of {siteConfig.stats.activeMembers} student engineers is currently
              designing and simulating our inaugural vehicle fleet.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Portfolio Grid or Coming Soon State */}
      <section className="py-16 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projectsData.length > 0 ? (
            <>
              {/* Controls Bar: Category Filters & Search */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#1b1f2e]">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2 text-xs font-mono text-slate-400">
                    <Filter className="w-3.5 h-3.5 text-racing-500" />
                    <span>FILTER:</span>
                  </div>
                  {projectCategories.map((cat) => {
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

                {/* Search Input */}
                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search CAD, CFD, EV..."
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

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={(p) => setSelectedProject(p)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto p-10 sm:p-16 rounded-sm bg-[#0e1018] border border-[#212638] text-center shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-racing-500/10 border border-racing-500/30 text-racing-500 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                <Wrench className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 rounded bg-[#151926] border border-[#252c3e] font-mono text-[10px] text-racing-400 uppercase tracking-widest font-semibold mb-3">
                R&D IN PROGRESS // EST. {siteConfig.establishedYear}
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Projects Are Coming...
              </h2>
              <p className="mt-4 font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {siteConfig.clubName} is newly established in {siteConfig.establishedYear}. Our squad of{" "}
                <span className="text-white font-medium">{siteConfig.stats.activeMembers} student engineers</span> across 6 divisions is actively engaged in parametric CAD modeling, CFD simulations, and chassis fabrication across our 13 departmental laboratories.
              </p>
              <p className="mt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                Full technical specification sheets, 3D renders, telemetry logs, and vehicle reveal dates will be published here as fabrication advances.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/about#laboratories" variant="primary" size="md">
                  View Our 13 Laboratories
                </Button>
                <Button href="/team" variant="secondary" size="md">
                  Meet The {siteConfig.stats.activeMembers} Members
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Spec Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
