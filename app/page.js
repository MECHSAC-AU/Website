"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { whatWeDo } from "@/data/services";
import { projectsData } from "@/data/projects";
import { eventsData } from "@/data/events";
import { membersData } from "@/data/members";
import { achievementsStats } from "@/data/achievements";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import MemberCard from "@/components/MemberCard";
import EventCard from "@/components/EventCard";
import GalleryGrid from "@/components/GalleryGrid";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import {
  Compass,
  Wrench,
  Gauge,
  Cpu,
  BookOpen,
  Users,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Trophy,
  Zap,
  Activity,
  Layers
} from "lucide-react";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Icon mapping for services
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-6 h-6 text-racing-500" />;
      case "Wrench":
        return <Wrench className="w-6 h-6 text-racing-500" />;
      case "Gauge":
        return <Gauge className="w-6 h-6 text-racing-500" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-racing-500" />;
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-racing-500" />;
      case "Users":
        return <Users className="w-6 h-6 text-racing-500" />;
      default:
        return <Wrench className="w-6 h-6 text-racing-500" />;
    }
  };

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const upcomingEvents = eventsData.upcoming.slice(0, 3);
  const previewMembers = membersData.slice(0, 4);

  return (
    <div className="relative">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#1b1f2e]">
        {/* Background Graphic Asset with Fallback */}
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder
            src="/images/hero/hero-car.jpg"
            alt="Formula Student Vehicle On Track"
            fill
            priority
            type="car"
            label="HERO IMAGE // APEX RACER"
            sublabel="Main Hero Showcase Background"
            className="w-full h-full object-cover"
          />
          {/* Subtle multi-layer gradient dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-racing-600/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Technical Coordinate Watermark */}
        <div className="absolute top-8 left-8 hidden lg:block z-10 font-mono text-[10px] text-slate-500 space-y-1">
          <div>SYS: AUTONOMY // TELEMETRY: 60Hz</div>
          <div>DIV: MECH ENG R&D GROUP</div>
          <div className="text-racing-500">ORG: {siteConfig.universityName}</div>
        </div>

        <div className="absolute top-8 right-8 hidden lg:block z-10 font-mono text-[10px] text-slate-500 text-right space-y-1">
          <div>STATUS: 2026 SEASON READY</div>
          <div className="text-racing-400">ORGANIZATION: {siteConfig.clubName}</div>
          <div>EST: {siteConfig.establishedYear} // {siteConfig.location.city}</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131622]/90 border border-[#2b334a] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-racing-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-slate-300 tracking-widest uppercase">
              {siteConfig.universityName} • {siteConfig.departmentName}
            </span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95] drop-shadow-2xl">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-racing-500">
              MOTION.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            Uniting ambitious student engineers to design, simulate, fabricate,
            and race high-performance prototypes. From Formula Student open-wheelers
            to electric battery powertrains and autonomous mobility.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/about" variant="primary" size="lg">
              Explore the Club
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              Our Projects
            </Button>
          </div>

          {/* Live Engineering Badges */}
          <div className="mt-14 pt-8 border-t border-[#1f2436]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl w-full text-left">
            <div>
              <div className="font-mono text-2xl font-black text-white">0-100</div>
              <div className="font-mono text-[11px] text-racing-500 uppercase">3.4 Sec Metric</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">420 N</div>
              <div className="font-mono text-[11px] text-racing-500 uppercase">Aero Downforce</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">400 V</div>
              <div className="font-mono text-[11px] text-racing-500 uppercase">EV Testbed</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">#01</div>
              <div className="font-mono text-[11px] text-racing-500 uppercase">National Design</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-racing-500 animate-bounce" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EDITORIAL INTRODUCTION */}
      {/* ========================================================= */}
      <section className="relative py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0b0c12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Bold Asymmetric Statement */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-racing-500" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-racing-500">
                  // 01 . IDENTITY
                </span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[1.05]">
                Where engineering <br />
                <span className="text-racing-500">meets the road.</span>
              </h2>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-racing-600" />
                <span className="h-[1px] w-24 bg-[#23283c]" />
              </div>
            </div>

            {/* Right Column: Narrative & Key Metrics */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-sans text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Operating under the {siteConfig.departmentName} at{" "}
                <span className="text-white font-medium">{siteConfig.universityName}</span>, our club is a self-governed motorsport engineering powerhouse. We do not just analyze equations on blackboards — we machine uprights, simulate CFD boundary layers, weld Chromoly spaceframes, and validate telemetry on racing circuits.
              </p>

              <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
                We empower students from mechanical, electrical, and aerospace engineering backgrounds to gain real-world industry experience before graduation, developing the problem-solving discipline required by Formula 1, hypercar OEMs, and aerospace programs.
              </p>

              {/* Statistics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1f2436]">
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                    {siteConfig.stats.activeMembers}
                  </div>
                  <div className="font-mono text-xs text-racing-500 uppercase mt-1">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                    {siteConfig.stats.projectsCompleted}
                  </div>
                  <div className="font-mono text-xs text-racing-500 uppercase mt-1">
                    Projects Built
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                    {siteConfig.stats.annualEvents}
                  </div>
                  <div className="font-mono text-xs text-racing-500 uppercase mt-1">
                    Annual Events
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                    8+
                  </div>
                  <div className="font-mono text-xs text-racing-500 uppercase mt-1">
                    Years Innovation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WHAT WE DO */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// 02 . CAPABILITIES"
            title="What We Do"
            subtitle="Bridging academic mechanical engineering with hands-on automotive fabrication, digital simulation, and competitive racecraft."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDo.map((item) => (
              <div
                key={item.number}
                className="group relative bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 p-6 sm:p-7 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(225,29,72,0.1)]"
              >
                <div>
                  {/* Card Header: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-racing-500 px-2 py-0.5 rounded bg-racing-950/60 border border-racing-500/30">
                      {item.number}
                    </span>
                    <div className="p-2.5 rounded bg-[#151926] border border-[#23293c] group-hover:border-racing-500/50 group-hover:bg-racing-950/30 transition-colors">
                      {getServiceIcon(item.icon)}
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                    {item.badge}
                  </span>
                  <h3 className="font-sans text-xl font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-[#1a1e2d] flex items-center justify-between">
                  <Link
                    href={item.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 group-hover:text-racing-400 transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-racing-500 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURED PROJECT (CASE STUDY STYLE) */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0c0d14] relative overflow-hidden">
        {/* Subtle grid bg */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.2) 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// 03 . FLAGSHIP ENGINEERING"
            title="Featured Project"
            subtitle="An in-depth look at our premier Formula Student competition prototype."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#10121b] border border-[#23283c] p-6 sm:p-10 rounded-sm shadow-2xl">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded overflow-hidden shadow-2xl border border-[#2b334a]">
                <ImagePlaceholder
                  src={featuredProject.heroImage}
                  alt={featuredProject.title}
                  aspectRatio="aspect-[16/10]"
                  type="car"
                  label="APEX-26 FORMULA PROTOTYPE"
                  sublabel="CAD Wireframe & Wind Tunnel Visual"
                />

                {/* Overlay Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-racing-500/60 uppercase">
                    SEASON // {featuredProject.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-1">
                  01 / FEATURED PROJECT
                </span>
                <h3 className="font-sans text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                  {featuredProject.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {featuredProject.description}
              </p>

              {/* Quick Specs List */}
              <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#1e2335]">
                {featuredProject.specs.slice(0, 4).map((spec, i) => (
                  <div key={i}>
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">
                      {spec.label}
                    </span>
                    <span className="font-sans text-sm font-bold text-white mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-2">
                  TOOLCHAINS & SPECIALIZATIONS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-slate-300 px-2.5 py-0.5 rounded bg-[#171b28] border border-[#282f44]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => setSelectedProject(featuredProject)}
                >
                  View Full Project Specs
                </Button>
                <Button variant="ghost" href="/projects">
                  All Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PROJECTS HORIZONTAL SHOWCASE */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              eyebrow="// 04 . VEHICLE SHOWCASE"
              title="Explore Our Fleet"
              subtitle="From high-downforce open-wheel racers to high-voltage electric platforms and autonomous rovers."
              className="mb-0"
            />
            <Button
              href="/projects"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-end"
            >
              View Full Portfolio
            </Button>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. UPCOMING EVENTS */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0c0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="// 05 . TRACK & WORKSHOPS"
              title="Upcoming Events"
              subtitle="Stay connected with our vehicle unveilings, CFD masterclasses, dyno tests, and engineering sprints."
              className="mb-0"
            />
            <Button
              href="/events"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-end"
            >
              See All Events
            </Button>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={() => {
                  window.location.href = `/contact?subject=${encodeURIComponent(
                    `Registration: ${event.title}`
                  )}`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TEAM PREVIEW */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="// 06 . THE ENGINEERS"
              title="Team Leadership"
              subtitle="The student engineers, designers, and telemetry specialists driving our organization forward."
              className="mb-0"
            />
            <Button
              href="/team"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-end"
            >
              Meet Full Team
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ACHIEVEMENTS & METRICS */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0b0c13] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="// 07 . TRACK RECORD"
            title="Engineered For Victory"
            subtitle="Our track podiums, structural design trophies, and national competition recognitions."
          />

          {/* Huge typography metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievementsStats.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded bg-[#10131d] border border-[#212638] text-center relative group hover:border-racing-500/60 transition-colors"
              >
                <div className="font-sans text-5xl sm:text-6xl font-black text-white group-hover:text-racing-400 transition-colors tracking-tight">
                  {item.value}
                </div>
                <div className="font-mono text-xs font-bold text-racing-500 uppercase mt-2 tracking-wider">
                  {item.label}
                </div>
                <p className="font-sans text-xs text-slate-400 mt-2">
                  {item.description}
                </p>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-racing-600 opacity-50 group-hover:w-16 transition-all" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/achievements" variant="secondary" size="md">
              View Detailed Timeline & Awards
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. GALLERY PREVIEW */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="// 08 . VISUAL ARCHIVE"
              title="Inside The Workshop & Track"
              subtitle="Behind the scenes in the machine bay, aerodynamic wind tunnel testing, and circuit competition."
              className="mb-0"
            />
            <Button
              href="/gallery"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-end"
            >
              Full Gallery Archive
            </Button>
          </div>

          <GalleryGrid limit={6} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. CALL TO ACTION */}
      {/* ========================================================= */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0e1018] to-[#08090C] overflow-hidden text-center">
        {/* Decorative Grid Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.3) 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest px-3 py-1 rounded bg-racing-950/60 border border-racing-500/30 inline-block mb-6">
            // JOIN OUR RECRUITMENT DRIVE
          </span>

          <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            BUILD. <br />
            DESIGN. <br />
            <span className="text-racing-500">DRIVE.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Join a community of students building the future of automotive engineering.
            Whether your passion is vehicle dynamics, powertrain, CAD modeling, or telemetry code.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact#join" variant="primary" size="lg">
              Join the Club
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Spec details modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
