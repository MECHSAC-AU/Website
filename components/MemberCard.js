import { Mail, Linkedin, Github } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

export default function MemberCard({ member }) {
  return (
    <div className="group relative bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(225,29,72,0.12)] flex flex-col justify-between">
      {/* Photo Placeholder Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0c0e14]">
        <ImagePlaceholder
          src={member.image}
          alt={member.name}
          aspectRatio="aspect-[4/5]"
          type="member"
          label={member.id ? member.id.toUpperCase() : "MEMBER"}
          sublabel={member.year}
        />

        {/* Category Overlay Tag */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="font-mono text-[9px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 uppercase">
            {member.category}
          </span>
        </div>

        {/* Corner notch decoration */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-racing-600/40 clip-path-notch" />
      </div>

      {/* Member Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-mono text-[10px] text-racing-500 uppercase tracking-widest font-semibold mb-1">
            {member.year} • {member.department ? member.department.replace("Department of ", "") : "Mech Eng"}
          </div>

          <h3 className="font-sans text-base sm:text-lg font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
            {member.name}
          </h3>

          <p className="text-xs font-semibold text-slate-300 mt-0.5">
            {member.role}
          </p>

          <p className="mt-2 text-xs text-slate-400 font-mono text-[11px] bg-[#141724] border border-[#23283c] p-2 rounded">
            FOCUS: {member.specialization}
          </p>

          {member.bio && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social / Contact Links */}
        <div className="mt-4 pt-3 border-t border-[#1b1f2e] flex items-center justify-between">
          <span className="font-mono text-[9px] text-slate-400 uppercase">
            CONNECT
          </span>

          <div className="flex items-center gap-2">
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-[#161a27] hover:bg-racing-600/20 text-slate-400 hover:text-white transition-colors border border-[#23283c] hover:border-racing-500"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.social?.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-[#161a27] hover:bg-racing-600/20 text-slate-400 hover:text-white transition-colors border border-[#23283c] hover:border-racing-500"
                aria-label={`${member.name} GitHub`}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.social?.email && (
              <a
                href={`mailto:${member.social.email}`}
                className="p-1.5 rounded bg-[#161a27] hover:bg-racing-600/20 text-slate-400 hover:text-white transition-colors border border-[#23283c] hover:border-racing-500"
                aria-label={`${member.name} Email`}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
