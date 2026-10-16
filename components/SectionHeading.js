export default function SectionHeading({
  eyebrow = "",
  title = "",
  subtitle = "",
  align = "left", // left | center
  className = "",
  badge = ""
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {/* Eyebrow / Technical code label */}
      {(eyebrow || badge) && (
        <div
          className={`flex items-center gap-2 mb-3.5 ${
            isCenter ? "justify-center" : "justify-start"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-racing-500 animate-pulse" />
          {eyebrow && (
            <span className="font-mono text-xs font-semibold tracking-widest text-racing-500 uppercase">
              {eyebrow}
            </span>
          )}
          {badge && (
            <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase px-2 py-0.5 rounded bg-[#161a27] border border-[#23283c]">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Main Title */}
      <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
        {title}
      </h2>

      {/* Decorative mechanical divider line */}
      <div
        className={`flex items-center gap-2 my-4 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-[2px] w-12 bg-racing-600" />
        <span className="h-[1px] w-24 bg-[#23283c]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-racing-500/80" />
      </div>

      {/* Subtitle / paragraph */}
      {subtitle && (
        <p className="font-sans text-base md:text-lg text-slate-400 font-normal leading-relaxed mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
