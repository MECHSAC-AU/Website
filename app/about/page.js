import { siteConfig } from "@/data/siteConfig";
import SectionHeading from "@/components/SectionHeading";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Button from "@/components/Button";
import {
  Compass,
  Wrench,
  Shield,
  Trophy,
  Zap,
  Target,
  Award,
  Layers,
  CheckCircle,
  Mail,
  User
} from "lucide-react";

export const metadata = {
  title: "About The Club",
  description: "Learn about the Automobile Club under the Department of Mechanical Engineering — history, mission, principles, and faculty leadership.",
};

const principles = [
  {
    num: "01",
    title: "Build With Purpose",
    desc: "Every bolt, tube notch, and carbon layer is calculated. We reject superficial design in favor of aerodynamic efficiency, torsional strength, and driver safety.",
    icon: Target,
  },
  {
    num: "02",
    title: "Learn By Doing",
    desc: "Equations in lectures come alive in the machine shop. We believe that true engineering intuition is forged with chips of metal on the lathe and dyno traces on the screen.",
    icon: Wrench,
  },
  {
    num: "03",
    title: "Engineer Responsibly",
    desc: "From high-voltage battery insulation to sustainable light-weighting and alternative fuels, our designs respect environmental imperatives and strict safety standards.",
    icon: Shield,
  },
  {
    num: "04",
    title: "Compete With Integrity",
    desc: "We bring discipline, teamwork, and fair play to national paddocks. Whether celebrating on the podium or fixing a differential at 3 AM, we uphold our engineering creed.",
    icon: Trophy,
  },
  {
    num: "05",
    title: "Innovate Continuously",
    desc: "Yesterday's benchmarks are tomorrow's baseline. We relentlessly refine our CAD geometries, telemetry algorithms, and composite tooling with each new season.",
    icon: Zap,
  },
];

const facilities = [
  {
    title: "Precision Machining Bay",
    specs: "3-Axis CNC Mill, Manual Precision Lathes, Surface Grinders",
    desc: "Equipped for tight-tolerance fabrication of aluminum 7075-T6 uprights, hub spindles, and bespoke drivetrain mounts.",
  },
  {
    title: "Advanced Fabrication & TIG Cell",
    specs: "Miller Syncrowave TIG, Argon Purging, Tubing Notchers",
    desc: "Dedicated to 4130 Chromoly tubular chassis triangulation, pedal-box welding, and exhaust collector fabrication.",
  },
  {
    title: "Composite Autoclave & Vacuum Cleanroom",
    specs: "Vacuum Infusion Pumps, Heat Cure Oven, Prepreg Freezers",
    desc: "Where our carbon-fiber monocoque panels, undertrays, and front wings are bagged, debulked, and cured.",
  },
  {
    title: "Electronics & Telemetry Workstations",
    specs: "CAN Bus Analyzers, 4-Channel Oscilloscopes, Soldering Stations",
    desc: "Development hub for our custom battery management systems, wireless telemetry modules, and sensor harnesses.",
  },
];

export default function AboutPage() {
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
                ORGANIZATIONAL IDENTITY
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              Engineering beyond <br />
              <span className="text-racing-500">the classroom.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Founded under the {siteConfig.departmentName} at{" "}
              {siteConfig.universityName}, the Automobile Club bridges textbook
              fluid dynamics, structural mechanics, and thermodynamics with
              the reality of high-performance vehicle execution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="// ORIGINS & EVOLUTION"
                title="Our Story"
                subtitle="From a modest student garage project to a nationally ranked Formula Student engineering team."
                className="mb-6"
              />

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                In {siteConfig.establishedYear}, a small cadre of third-year mechanical
                engineering students banded together with a singular ambition: to build
                a vehicle from raw tubing and aluminum bar stock that could pass
                the unforgiving technical scrutineering of national Formula competitions.
              </p>

              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Operating out of a cramped corner in the machine shop with little more
                than a handheld angle grinder and SolidWorks student licenses, they
                engineered the club&apos;s first prototype. What began as an extracurricular
                passion project rapidly evolved into the department&apos;s premier technical
                flagship organization.
              </p>

              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Today, our roster spans more than 50 active student engineers across
                chassis, powertrain, aerodynamics, electronics, and operations. We
                regularly compete on premier race circuits, publish student research papers,
                and send our alumni into top motorsport teams and automotive OEMs worldwide.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative p-2 bg-[#121520] border border-[#23283c] rounded-sm shadow-2xl">
                <ImagePlaceholder
                  src="/images/gallery/gallery-02.jpg"
                  alt="Students fabricating spaceframe chassis"
                  aspectRatio="aspect-[4/3]"
                  type="blueprint"
                  label="WORKSHOP ARCHIVE // CHASSIS BAY"
                  sublabel="Original Workshop Bay Setup"
                />
                <div className="p-4 bg-[#0d0f17] border-t border-[#1f2436] flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span>PHOTO ARCHIVE: FABRICATION CELL 01</span>
                  <span className="text-racing-500">EST. {siteConfig.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 border-b border-[#1b1f2e] bg-[#0c0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-sm bg-[#10121c] border border-[#23283c] relative overflow-hidden group hover:border-racing-500/60 transition-colors">
              <div className="w-12 h-12 rounded bg-racing-950/60 border border-racing-500/40 flex items-center justify-center text-racing-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-2">
                // MISSION STATEMENT
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white uppercase mb-4">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                To cultivate world-class automotive engineers through rigorous,
                hands-on design, rapid physical prototyping, multidisciplinary
                collaboration, and high-stakes collegiate competition — equipping
                students to lead the mobility revolution.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-sm bg-[#10121c] border border-[#23283c] relative overflow-hidden group hover:border-racing-500/60 transition-colors">
              <div className="w-12 h-12 rounded bg-racing-950/60 border border-racing-500/40 flex items-center justify-center text-racing-500 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-2">
                // FUTURE HORIZON
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white uppercase mb-4">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                To be internationally recognized as a top-tier collegiate motorsport
                and sustainable mobility engineering group — pioneering carbon-neutral
                racing architectures, battery system efficiency, and autonomous
                vehicle dynamics in student engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Believe (5 Principles) */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// CORE VALUES"
            title="What We Believe"
            subtitle="The fundamental engineering tenets governing every calculation, component, and track day."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="p-7 rounded-sm bg-[#0e1018] border border-[#212638] hover:border-racing-500/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-racing-500 px-2 py-0.5 rounded bg-racing-950/60 border border-racing-500/30">
                        {p.num}
                      </span>
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-racing-500 transition-colors" />
                    </div>

                    <h3 className="font-sans text-lg font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
                      {p.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Faculty / Department Support */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0c0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// ACADEMIC GOVERNANCE"
            title="Faculty & Department Support"
            subtitle="Guiding student innovation with academic rigor, safety protocols, and laboratory sponsorship."
          />

          <div className="bg-[#10121b] border border-[#23283c] p-6 sm:p-10 rounded-sm shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Faculty Advisor Image Placeholder */}
            <div className="lg:col-span-4">
              <div className="relative rounded overflow-hidden max-w-sm mx-auto">
                <ImagePlaceholder
                  src={siteConfig.facultyAdvisor.image}
                  alt={siteConfig.facultyAdvisor.name}
                  aspectRatio="aspect-[4/5]"
                  type="faculty"
                  label="FACULTY COORDINATOR"
                  sublabel="Professor, Mech Eng"
                />
              </div>
            </div>

            {/* Faculty Message */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171b28] border border-[#282f44] text-xs font-mono text-racing-400">
                <User className="w-3.5 h-3.5 text-racing-500" />
                <span>OFFICIAL FACULTY ADVISOR</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white uppercase">
                {siteConfig.facultyAdvisor.name}
              </h3>

              <div className="font-mono text-xs text-slate-400 space-y-0.5">
                <div>{siteConfig.facultyAdvisor.designation}</div>
                <div>{siteConfig.facultyAdvisor.department}</div>
                <div className="text-slate-500">OFFICE: {siteConfig.facultyAdvisor.office}</div>
              </div>

              <blockquote className="p-4 sm:p-6 rounded bg-[#0d0f16] border-l-4 border-racing-500 text-sm sm:text-base text-slate-300 italic leading-relaxed my-4">
                &ldquo;{siteConfig.facultyAdvisor.message}&rdquo;
              </blockquote>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
                <a
                  href={`mailto:${siteConfig.facultyAdvisor.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-racing-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-racing-500" />
                  <span>{siteConfig.facultyAdvisor.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Facilities & Equipment */}
      <section className="py-20 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// WORKSHOP INFRASTRUCTURE"
            title="Our R&D Laboratories"
            subtitle="The specialized machining, welding, composite, and simulation facilities behind our prototypes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-sm bg-[#0e1018] border border-[#212638] hover:border-racing-500/60 transition-colors"
              >
                <div className="font-mono text-[10px] text-racing-500 uppercase tracking-wider font-semibold mb-1">
                  FACILITY BAY 0{idx + 1}
                </div>
                <h3 className="font-sans text-xl font-bold text-white uppercase">
                  {fac.title}
                </h3>
                <div className="mt-2 font-mono text-xs text-slate-300 bg-[#141724] border border-[#202538] px-3 py-1.5 rounded inline-block">
                  KEY TOOLING: {fac.specs}
                </div>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/team" variant="primary" size="md">
              Meet The Engineers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
