"use client";

import { useState } from "react";
import { eventsData, eventCategories } from "@/data/events";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Calendar, MapPin, Clock, Tag, ArrowRight, CheckCircle, X } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'upcoming' | 'past'
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerEmail) return;
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setRegisterModalEvent(null);
      setRegisterEmail("");
    }, 2500);
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
                SCHEDULE & RECAPS
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              EVENTS & <br />
              <span className="text-racing-500">TRACK SESSIONS.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Explore upcoming masterclasses, technical seminars, dynamic track trials,
              and archive recaps from past national competitions.
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
              All Events ({eventsData.upcoming.length + eventsData.past.length})
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                activeTab === "upcoming"
                  ? "bg-racing-600 text-white border border-racing-500"
                  : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638]"
              }`}
            >
              Upcoming ({eventsData.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                activeTab === "past"
                  ? "bg-racing-600 text-white border border-racing-500"
                  : "bg-[#11141e] text-slate-300 hover:text-white border border-[#212638]"
              }`}
            >
              Past Archive ({eventsData.past.length})
            </button>
          </div>

          {/* Upcoming Section */}
          {(activeTab === "all" || activeTab === "upcoming") && (
            <div className="mb-20">
              <SectionHeading
                eyebrow="// FORTHCOMING"
                title="Upcoming Events"
                subtitle="Reserve your seat for upcoming vehicle rollouts, guest lectures, and student software masterclasses."
              />

              <div className="space-y-6">
                {eventsData.upcoming.map((event) => (
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
          {(activeTab === "all" || activeTab === "past") && (
            <div>
              <SectionHeading
                eyebrow="// HISTORICAL LOG"
                title="Past Events & Competition Recaps"
                subtitle="Relive our previous track tests, machine shop workshops, and department conferences."
              />

              <div className="space-y-6">
                {eventsData.past.map((event) => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))}
              </div>
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
                <div className="p-3 rounded bg-[#131724] border border-[#212638] text-xs font-mono text-slate-300 space-y-1">
                  <div>DATE: {registerModalEvent.date} ({registerModalEvent.time})</div>
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
                  <Button type="submit" variant="primary" size="md">
                    Confirm Seat
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
