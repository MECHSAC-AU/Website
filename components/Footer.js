import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Mail, MapPin, ExternalLink, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#06070a] border-t border-[#1b1f2d] pt-16 pb-12 overflow-hidden">
      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.2) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#1b1f2d]">
          {/* Col 1 & 2: Brand & University Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#0c0e14] border border-[#2a3044] flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.15)] shrink-0">
                <img
                  src={siteConfig.logo || "/images/logos/club-logo.png"}
                  alt={`${siteConfig.clubName} Logo`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-racing-500 rotate-45" />
              </div>
              <div>
                <span className="font-sans text-base font-extrabold tracking-wider text-white uppercase block">
                  {siteConfig.clubName}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-racing-500 uppercase block">
                  {siteConfig.universityName} • {siteConfig.departmentName}
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier student motorsport and automotive engineering organization of{" "}
              <span className="text-slate-200 font-medium">{siteConfig.universityName}</span>. Designing, fabricating, and racing high-performance prototypes since {siteConfig.establishedYear}.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-racing-500 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.location.workshop}, {siteConfig.location.campus}, {siteConfig.location.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Mail className="w-4 h-4 text-racing-500 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-racing-400 transition-colors font-mono"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-racing-600 rounded-full" />
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Home", href: "/" },
                { label: "About Organization", href: "/about" },
                { label: "Team Members", href: "/team" },
                { label: "Engineering Projects", href: "/projects" },
                { label: "Upcoming Events", href: "/events" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Achievements & Awards", href: "/achievements" },
                { label: "Contact & Bay Access", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-racing-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Technical Divisions */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-racing-600 rounded-full" />
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/projects?category=Motorsports" className="hover:text-white transition-colors">
                  Formula Student Racing
                </Link>
              </li>
              <li>
                <Link href="/projects?category=EV" className="hover:text-white transition-colors">
                  Electric Vehicle Powertrains
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Fabrication" className="hover:text-white transition-colors">
                  Composite Monocoque & TIG
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Vehicle%20Design" className="hover:text-white transition-colors">
                  Aerodynamics & CFD
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Robotics" className="hover:text-white transition-colors">
                  Autonomous Rover Robotics
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Research" className="hover:text-white transition-colors">
                  Engine Dynamometer Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institution & Connect */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-racing-600 rounded-full" />
              Affiliation
            </h4>
            <div className="p-3.5 rounded bg-[#10131d] border border-[#1e2333] mb-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white/10 border border-[#2a3044] shrink-0 p-1 flex items-center justify-center">
                <img
                  src={siteConfig.universityLogo || "/images/logos/university-logo.png"}
                  alt={`${siteConfig.universityName} Seal`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-racing-500 uppercase block tracking-wider font-semibold">
                  ACCREDITATION
                </span>
                <p className="font-sans text-xs text-white mt-0.5 font-bold">
                  {siteConfig.universityName}
                </p>
                <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                  {siteConfig.departmentName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-[#131724] border border-[#212638] flex items-center justify-center text-slate-400 hover:text-white hover:border-racing-500 transition-colors"
                  aria-label={platform}
                >
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {platform.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 {siteConfig.clubName} — {siteConfig.departmentName}, {siteConfig.universityName}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">SYSTEM ID: MEC-AUTO-2026</span>
            <span className="h-3 w-[1px] bg-slate-800" />
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Constitution
            </Link>
            <span className="h-3 w-[1px] bg-slate-800" />
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Workshop Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
