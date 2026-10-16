"use client";

import { Calendar, MapPin, Clock, ArrowRight, Tag } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import Button from "./Button";

export default function EventCard({ event, onRegisterClick, isPast = false }) {
  return (
    <div className="group relative bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(225,29,72,0.12)] flex flex-col md:flex-row">
      {/* Visual / Date badge column */}
      <div className="relative md:w-72 lg:w-80 shrink-0 overflow-hidden bg-[#0c0e14]">
        <ImagePlaceholder
          src={event.image}
          alt={event.title}
          aspectRatio="aspect-[16/10] md:aspect-auto"
          fill
          type="event"
          label={event.category.toUpperCase()}
          sublabel={event.date}
        />

        {/* Floating Date Badge */}
        <div className="absolute top-3 left-3 z-20 flex flex-col items-center justify-center w-14 h-14 bg-black/85 backdrop-blur-md border border-racing-500/50 rounded-sm text-center shadow-lg">
          <span className="font-sans text-lg font-black text-white leading-none">
            {event.day || "28"}
          </span>
          <span className="font-mono text-[9px] font-bold text-racing-500 uppercase leading-tight tracking-wider mt-0.5">
            {event.month || "OCT"}
          </span>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3 z-20">
          <span className="font-mono text-[9px] font-semibold text-white px-2 py-0.5 rounded bg-racing-950/80 backdrop-blur-md border border-racing-500/50 uppercase">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content Column */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-2">
            {event.time && (
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-racing-500" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-racing-500" />
              {event.location}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-sans text-xl font-bold text-white uppercase group-hover:text-racing-400 transition-colors">
            {event.title}
          </h3>

          {/* Description or Recap */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isPast ? event.recap : event.description}
          </p>

          {/* Tags */}
          {event.tags && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-slate-300 bg-[#151926] border border-[#23283c] px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Past Event Highlight if applicable */}
          {isPast && event.awards && (
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-racing-950/40 border border-racing-500/30 text-[11px] font-mono text-racing-400">
              <span>★ OUTCOME:</span>
              <span className="text-white font-medium">{event.awards}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-[#1b1f2e] flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-slate-400 uppercase">
            {event.seats ? event.seats : `SYS // ${event.id}`}
          </span>

          {!isPast ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onRegisterClick && onRegisterClick(event)}
            >
              Register / Details
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              href="/gallery?category=Competitions"
            >
              View Event Gallery
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
