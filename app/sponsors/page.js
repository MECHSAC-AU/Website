import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { siteConfig } from "@/data/siteConfig";
import { sponsorsData } from "@/data/sponsors";
import { contributorsData } from "@/data/contributors";
import ContributorCard from "@/components/ContributorCard";
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Heart,
  Building,
  Mail,
  ExternalLink,
  Users,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Our Sponsors",
  description: `Official sponsors and corporate partners of ${siteConfig.clubName} at ${siteConfig.universityName}. Explore partnership opportunities.`,
};

export default function SponsorsPage() {
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
                INDUSTRY PARTNERSHIP // EST. {siteConfig.establishedYear}
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              OUR <br />
              <span className="text-racing-500">SPONSORS.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Official corporate, technical, and industry partners supporting {siteConfig.clubName} under
              the {siteConfig.departmentName} at {siteConfig.universityName}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#become-sponsor" variant="primary" size="md">
                Become Our Sponsor
              </Button>
              <Button href="/sponsors/contributors" variant="secondary" size="md">
                Our Contributors
              </Button>
            </div>
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
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm bg-racing-600 text-white border border-racing-500 shadow-[0_0_12px_rgba(225,29,72,0.35)]"
              >
                Our Sponsors
              </Link>
              <Link
                href="/sponsors/contributors"
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm bg-[#11141e] text-slate-300 hover:text-white border border-[#212638] hover:border-slate-500 transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-racing-500" />
                <span>Our Contributors</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-racing-500" />
              <span>OFFICIAL ALIAH UNIVERSITY ENDORSED</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Sponsors Showcase */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="// PARTNERS"
            title="Our Sponsors"
            subtitle={`Industry organizations and corporate partners empowering student automotive engineering at ${siteConfig.universityName}.`}
          />

          {sponsorsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsorsData.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="p-8 rounded-sm bg-[#0e1018] border border-[#212638] hover:border-racing-500/70 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {sponsor.logo ? (
                      <div className="h-20 mb-6 flex items-center justify-center p-4 bg-[#141724] border border-[#22273a] rounded-sm">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-20 mb-6 flex items-center justify-center p-4 bg-[#141724] border border-[#22273a] rounded-sm">
                        <Building className="w-8 h-8 text-racing-500" />
                      </div>
                    )}

                    <h3 className="font-sans text-xl font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
                      {sponsor.name}
                    </h3>

                    {sponsor.description && (
                      <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {sponsor.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1b1f2e] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 uppercase">
                      PARTNER // {sponsor.partnershipYear || "2026"}
                    </span>
                    {sponsor.website && (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3 text-racing-500" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-14 rounded-sm bg-[#0e1018] border border-[#212638] text-center max-w-3xl mx-auto shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-racing-500/10 border border-racing-500/30 text-racing-500 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                <Building className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 rounded bg-[#151926] border border-[#252c3e] font-mono text-[10px] text-racing-400 uppercase tracking-widest font-semibold mb-3">
                INAUGURAL SEASON // EST. {siteConfig.establishedYear}
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Sponsors Announced Soon
              </h3>
              <p className="mt-4 font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {siteConfig.clubName} is newly established in {siteConfig.establishedYear} under the {siteConfig.departmentName} at {siteConfig.universityName}. We are currently engaging with industry leaders, automotive manufacturers, and equipment vendors for our inaugural season. Confirmed sponsors will be showcased here.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="#become-sponsor" variant="primary" size="md">
                  Become Our Sponsor
                </Button>
                <Button href="/sponsors/contributors" variant="secondary" size="md">
                  Our Contributors
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Spotlight: Our Contributors Subsection */}
      <section className="py-20 lg:py-28 border-b border-[#1b1f2e] bg-[#0c0d14] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.25) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="// PATRONAGE"
              title="Our Contributors"
              subtitle="Recognizing faculty members, mentors, and supporters who contribute to our organization."
              className="mb-0"
            />
            <Button
              href="/sponsors/contributors"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-end"
            >
              View Our Contributors
            </Button>
          </div>

          {contributorsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributorsData.slice(0, 3).map((contributor) => (
                <ContributorCard key={contributor.id} contributor={contributor} />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-sm bg-[#10121b] border border-[#23283c] text-center max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-racing-500/10 border border-racing-500/30 flex items-center justify-center text-racing-500 mx-auto mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-tight">
                Our Contributors Page
              </h3>
              <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
                Visit our dedicated contributors page to view faculty members, mentors, and individual supporters who contribute to our mechanical engineering initiatives.
              </p>
              <div className="mt-6 flex justify-center">
                <Button href="/sponsors/contributors" variant="primary" size="md">
                  View Our Contributors
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Become Our Sponsor Section */}
      <section id="become-sponsor" className="py-20 bg-[#08090C] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-sm bg-gradient-to-br from-[#121420] via-[#0f111a] to-[#08090C] border border-[#282e44] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block">
                // PARTNER WITH US
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                Become Our Sponsor
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Partner with {siteConfig.clubName} to support 110+ student engineers, gain brand visibility on vehicle liveries and workshops, and connect directly with upcoming mechanical engineering talent at {siteConfig.universityName}.
              </p>
              <div className="font-mono text-xs text-slate-400 space-y-1 pt-2">
                <div>DIRECT INQUIRY: <span className="text-white">{siteConfig.contactEmail}</span></div>
                <div>DEPARTMENT: <span className="text-white">{siteConfig.departmentName}, {siteConfig.universityName}</span></div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                  "Sponsorship Inquiry - MECHSAC"
                )}`}
                variant="primary"
                size="lg"
                className="w-full text-center justify-center"
              >
                Become Our Sponsor
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full text-center justify-center"
              >
                Contact Club Office
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
