"use client";

import { useState, useEffect } from "react";
import { eventsData, eventCategories } from "@/data/events";
import { getLiveEvents } from "@/lib/api/public";
import { siteConfig } from "@/data/siteConfig";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Calendar, MapPin, Clock, Tag, ArrowRight, CheckCircle, X } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState(eventsData);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'upcoming' | 'past'
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    getLiveEvents().then((data) => {
      if (data && (data.upcoming?.length > 0 || data.past?.length > 0)) {
        setEvents(data);
      }
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerEmail.trim() || !registerName.trim() || !registerModalEvent) return;

    setIsSubmitting(true);
    setRegisterError(null);

    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: registerModalEvent.id,
          event_title: registerModalEvent.title,
          name: registerName.trim(),
          email: registerEmail.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register for event");
      }

      setRegisteredSuccess(true);
      setTimeout(() => {
        setRegisteredSuccess(false);
        setRegisterModalEvent(null);
        setRegisterName("");
        setRegisterEmail("");
      }, 3000);
    } catch (err) {
      console.error("Event registration error:", err);
      setRegisterError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                SCHEDULE &amp; CALENDAR // EST. {siteConfig.establishedYear}
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              EVENTS &amp; <br />
              <span className="text-racing-500">SCHEDULE.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Official schedule for our grand inauguration, upcoming workshops,
              technical seminars, and departmental sessions at {siteConfig.universityName}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Events Navigation Tabs */}
      <section className="py-12 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12 pb-4 border-b border-[#1b1f2e]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                activeTab === "all"
                  ? "bg-racing-600 text-white border border-racing-500"
                  : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638]"
              }`}
            >
              All Events ({events.upcoming.length + events.past.length})
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                activeTab === "upcoming"
                  ? "bg-racing-600 text-white border border-racing-500"
                  : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638]"
              }`}
            >
              Upcoming ({events.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                activeTab === "past"
                  ? "bg-racing-600 text-white border border-racing-500"
                  : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638]"
              }`}
            >
              Past Archive ({events.past.length})
            </button>
          </div>

          {/* Upcoming Section */}
          {(activeTab === "all" || activeTab === "upcoming") && (
            <div className="mb-20">
              <SectionHeading
                eyebrow="// FORTHCOMING"
                title="Upcoming Events"
                subtitle={`Stay tuned for upcoming events under the Department of Mechanical Engineering at ${siteConfig.universityName}.`}
              />

              <div className="space-y-6">
                {events.upcoming.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegisterClick={(evt) => setRegisterModalEvent(evt)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {(activeTab === "past" || (activeTab === "all" && events.past.length > 0)) && (
            <div>
              <SectionHeading
                eyebrow="// HISTORICAL LOG"
                title="Past Events & Recaps"
                subtitle="Archive of our previous track tests, machine shop workshops, and department sessions."
              />

              {events.past.length > 0 ? (
                <div className="space-y-6">
                  {events.past.map((event) => (
                    <EventCard key={event.id} event={event} isPast={true} />
                  ))}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-sm bg-[#0e1018] border border-[#212638] text-center shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-racing-500/10 border border-racing-500/30 text-racing-500 mb-5">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded bg-[#151926] border border-[#252c3e] font-mono text-[10px] text-racing-400 uppercase tracking-widest font-semibold mb-3">
                    INAUGURAL SEASON // EST. {siteConfig.establishedYear}
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-tight">
                    No Past Events Yet
                  </h3>
                  <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed font-light">
                    {siteConfig.clubName} is newly established in {siteConfig.establishedYear}. Event recaps, presentations, and technical documentation will be archived here following our Grand Inauguration and upcoming semester activities.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {registerModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setRegisterModalEvent(null)}
          />

          <div className="relative z-10 w-full max-w-lg bg-[#0e1018] border border-[#262c3e] rounded-sm p-6 sm:p-8 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2436] mb-5">
              <div>
                <span className="font-mono text-[10px] text-racing-500 uppercase tracking-widest block">
                  EVENT REGISTRATION
                </span>
                <h3 className="font-sans text-lg font-bold text-white uppercase mt-0.5">
                  {registerModalEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setRegisterModalEvent(null)}
                className="p-1 rounded bg-[#171b28] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {registeredSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-racing-500 mx-auto animate-bounce" />
                <h4 className="font-sans text-xl font-bold uppercase text-white">
                  Registration Confirmed!
                </h4>
                <p className="text-xs text-slate-300">
                  A confirmation packet and room location passes have been routed to{" "}
                  <span className="font-mono text-racing-400">{registerEmail}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {registerError && (
                  <div className="p-2.5 rounded bg-racing-950/60 border border-racing-500/50 text-xs font-mono text-racing-300">
                    {registerError}
                  </div>
                )}

                <div className="p-3 rounded bg-[#131724] border border-[#212638] text-xs font-mono text-slate-300 space-y-1">
                  <div>DATE: {registerModalEvent.date} {registerModalEvent.time ? `• ${registerModalEvent.time}` : ""}</div>
                  <div>VENUE: {registerModalEvent.location}</div>
                  <div>CAPACITY: {registerModalEvent.seats}</div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full px-3.5 py-2.5 bg-[#141724] border border-[#262c3e] focus:border-racing-500 rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                    University Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full px-3.5 py-2.5 bg-[#141724] border border-[#262c3e] focus:border-racing-500 rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterModalEvent(null)}
                    className="px-4 py-2 font-mono text-xs uppercase text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Confirm Seat"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
