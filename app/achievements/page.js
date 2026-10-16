import {
  achievementsStats,
  achievementsTimeline,
  certificationsAndPartners,
} from "@/data/achievements";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Trophy, Award, Zap, Shield, Star, Flag, CheckCircle, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Achievements & Awards",
  description: "Explore the competition honors, design championships, and engineering milestones earned by the Automobile Club.",
};

const getTimelineIcon = (iconName) => {
  switch (iconName) {
    case "Trophy":
      return <Trophy className="w-5 h-5 text-racing-500" />;
    case "Zap":
      return <Zap className="w-5 h-5 text-racing-500" />;
    case "Award":
      return <Award className="w-5 h-5 text-racing-500" />;
    case "Shield":
      return <Shield className="w-5 h-5 text-racing-500" />;
    case "Star":
      return <Star className="w-5 h-5 text-racing-500" />;
    case "Flag":
      return <Flag className="w-5 h-5 text-racing-500" />;
    default:
      return <Trophy className="w-5 h-5 text-racing-500" />;
  }
};

export default function AchievementsPage() {
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
                AWARDS & HONORS
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              PROVEN ON <br />
              <span className="text-racing-500">THE CIRCUIT.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Every trophy reflects countless hours of structural stress analysis,
              aerodynamic optimization, and tireless teamwork in the department machine bay.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Banner */}
      <section className="py-12 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievementsStats.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded bg-[#0f1118] border border-[#212638] text-center"
              >
                <div className="font-sans text-4xl sm:text-5xl font-black text-white">
                  {item.value}
                </div>
                <div className="font-mono text-xs font-bold text-racing-500 uppercase mt-2">
                  {item.label}
                </div>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Chronological Achievements Timeline */}
      <section className="py-20 border-b border-[#1b1f2e] bg-[#0b0c13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// COMPETITION HISTORY"
            title="Podiums & Design Honors"
            subtitle="Chronological log of regional and national student motorsport distinctions."
          />

          <div className="relative border-l-2 border-[#23283c] ml-4 md:ml-32 space-y-12">
            {achievementsTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                {/* Year Marker on Left (Desktop) */}
                <div className="hidden md:block absolute -left-32 top-0 w-24 text-right">
                  <span className="font-mono text-xl font-bold text-racing-500">
                    {item.year}
                  </span>
                </div>

                {/* Timeline Node Icon */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#141724] border-2 border-racing-500 flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.4)] group-hover:scale-110 transition-transform">
                  {getTimelineIcon(item.icon)}
                </div>

                {/* Timeline Card */}
                <div className="p-6 sm:p-7 rounded-sm bg-[#0f121a] border border-[#212638] group-hover:border-racing-500/60 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="md:hidden font-mono text-xs font-bold text-racing-500">
                      YEAR {item.year}
                    </span>
                    <span className="font-mono text-[10px] text-racing-400 uppercase tracking-wider px-2 py-0.5 rounded bg-racing-950/60 border border-racing-500/30">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {item.organization}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Certifications & Technical Partnerships */}
      <section className="py-20 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// SAFETY & COMPLIANCE"
            title="Certifications & Technical Standards"
            subtitle="Adhering to international motorsport safety regulations and academic software licensing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificationsAndPartners.map((cert, idx) => (
              <div
                key={idx}
                className="p-5 rounded bg-[#0e1018] border border-[#212638] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-racing-500 shrink-0" />
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white uppercase">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-[11px] text-slate-400">
                      VALID: {cert.year}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-racing-500 px-2 py-1 rounded bg-[#161a27] border border-[#23283c]">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button href="/projects" variant="primary" size="md">
              View The Racecars Behind These Awards
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
