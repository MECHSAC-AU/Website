"use client";

import { useState } from "react";
import Image from "next/image";
import { Wrench, Car, User, Calendar, Camera, Shield, Award, Cpu } from "lucide-react";

export default function ImagePlaceholder({
  src,
  alt = "Automotive Club Asset",
  aspectRatio = "aspect-video",
  className = "",
  label = "SPEC-ASSET",
  sublabel = "",
  type = "default",
  priority = false,
  fill = false
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getIcon = () => {
    switch (type) {
      case "car":
      case "project":
        return <Car className="w-8 h-8 text-racing-500" />;
      case "member":
      case "faculty":
        return <User className="w-8 h-8 text-racing-500" />;
      case "event":
        return <Calendar className="w-8 h-8 text-racing-500" />;
      case "gallery":
        return <Camera className="w-8 h-8 text-racing-500" />;
      case "award":
        return <Award className="w-8 h-8 text-racing-500" />;
      case "tech":
        return <Cpu className="w-8 h-8 text-racing-500" />;
      default:
        return <Wrench className="w-8 h-8 text-racing-500" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#0c0e14] border border-[#212638] rounded-sm group select-none ${
        fill ? "w-full h-full" : aspectRatio
      } ${className}`}
    >
      {/* Corner crosshair markers */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-racing-500/80 z-20 pointer-events-none" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-racing-500/80 z-20 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-racing-500/80 z-20 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-racing-500/80 z-20 pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.25) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      />

      {/* Render actual image if not errored */}
      {!hasError && src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Fallback graphic if image errors or while loading */}
      {(hasError || !src) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-br from-[#10131d] via-[#0b0d13] to-[#08090d]">
          <div className="relative mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-[#151926] border border-[#262c3e] shadow-[0_0_15px_rgba(225,29,72,0.15)] group-hover:border-racing-500/50 transition-colors">
            {getIcon()}
          </div>
          <div className="font-mono text-[10px] tracking-widest text-racing-500 font-semibold uppercase mb-1">
            PLACEHOLDER — {label}
          </div>
          <p className="font-sans text-xs font-medium text-slate-300 max-w-[280px] line-clamp-1">
            {alt}
          </p>
          {sublabel && (
            <span className="mt-1 font-mono text-[10px] text-slate-500">
              {sublabel}
            </span>
          )}
          <span className="mt-2 text-[9px] font-mono text-slate-600 px-2 py-0.5 rounded bg-[#131622] border border-[#1f2434]">
            SRC: {src || "LOCAL ASSET"}
          </span>
        </div>
      )}
    </div>
  );
}
