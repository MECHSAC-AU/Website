import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function Button({
  children,
  href,
  variant = "primary", // primary | secondary | outline | ghost
  size = "md", // sm | md | lg
  icon = "arrow", // arrow | up-right | none
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium uppercase tracking-wider text-xs transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-racing-500/50 disabled:opacity-50 disabled:pointer-events-none group select-none";

  const sizeStyles = {
    sm: "px-3.5 py-2 text-[11px] gap-1.5",
    md: "px-5 py-3 text-xs gap-2",
    lg: "px-7 py-3.5 text-sm gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-racing-600 hover:bg-racing-700 text-white shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_25px_rgba(225,29,72,0.55)] border border-racing-500/50 hover:border-racing-400",
    secondary:
      "bg-[#141722] hover:bg-[#1a1e2c] text-slate-200 hover:text-white border border-[#262c3e] hover:border-racing-500/50 shadow-sm",
    outline:
      "bg-transparent hover:bg-racing-600/10 text-white border border-racing-500/70 hover:border-racing-500 shadow-[0_0_15px_rgba(225,29,72,0.15)]",
    ghost:
      "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-transparent",
  };

  const renderIcon = () => {
    if (icon === "arrow") {
      return (
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      );
    }
    if (icon === "up-right") {
      return (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      );
    }
    return null;
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
}
