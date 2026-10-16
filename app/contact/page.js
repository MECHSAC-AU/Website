"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Github,
  Youtube,
  ShieldAlert
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "General",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill subject if directed with hash or query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const subjectParam = urlParams.get("subject");
      if (subjectParam) {
        setFormData((prev) => ({ ...prev, subject: subjectParam }));
      }
      if (window.location.hash === "#join") {
        setFormData((prev) => ({
          ...prev,
          interest: "Recruitment",
          subject: "Application for Student Engineering Team",
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate frontend submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      interest: "General",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-24 border-b border-[#1b1f2e] bg-[#0b0c12] overflow-hidden">
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
                COMMUNICATIONS & ACCESS
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              LET&apos;S BUILD <br />
              <span className="text-racing-500">SOMETHING.</span>
            </h1>

            <p className="mt-6 font-sans text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Reach out for student recruitment applications, industry sponsorship proposals,
              academic research partnerships, or machine bay tours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 bg-[#08090C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-2">
                  // CONTACT INFORMATION
                </span>
                <h2 className="font-sans text-2xl font-bold text-white uppercase">
                  Department Headquarters
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  The club operates within the dedicated automotive workshop bay
                  and CAD simulation clusters under the Department of Mechanical Engineering.
                </p>
              </div>

              {/* Info Badges */}
              <div className="space-y-4">
                <div className="p-4 rounded-sm bg-[#0f1118] border border-[#212638] flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-racing-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">
                      OFFICIAL CLUB EMAIL
                    </span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="font-mono text-sm text-white hover:text-racing-400 transition-colors"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-[#0f1118] border border-[#212638] flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-racing-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">
                      WORKSHOP & LAB LOCATION
                    </span>
                    <p className="text-xs text-white mt-0.5 font-medium">
                      {siteConfig.location.workshop}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                      {siteConfig.departmentName}, {siteConfig.universityName}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-[#0f1118] border border-[#212638] flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-racing-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">
                      WORKSHOP OPERATING HOURS
                    </span>
                    <p className="text-xs text-white mt-0.5">
                      Mon – Fri: 09:00 – 21:00 <br />
                      Sat (Track Prep): 10:00 – 18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Faculty Advisor link note */}
              <div className="p-4 rounded-sm bg-[#121520] border border-[#23283c]">
                <span className="font-mono text-[10px] text-racing-500 uppercase font-semibold block">
                  FACULTY ADVISOR POINT OF CONTACT
                </span>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {siteConfig.facultyAdvisor.name} ({siteConfig.facultyAdvisor.designation})
                </p>
                <a
                  href={`mailto:${siteConfig.facultyAdvisor.email}`}
                  className="font-mono text-xs text-slate-400 hover:text-racing-400 mt-0.5 block"
                >
                  {siteConfig.facultyAdvisor.email}
                </a>
              </div>

              {/* Social Channels */}
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-3">
                  DIGITAL CHANNELS:
                </span>
                <div className="flex items-center gap-3">
                  {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-sm bg-[#11141e] border border-[#212638] hover:border-racing-500 text-xs font-mono uppercase text-slate-300 hover:text-white transition-colors"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Application Form */}
            <div id="join" className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-sm bg-[#0e1018] border border-[#212638] shadow-2xl">
                <div className="mb-6 pb-4 border-b border-[#1b1f2e]">
                  <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-1">
                    // DISPATCH MESSAGE
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white uppercase">
                    Connect With The Club
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Submit recruitment inquiries, sponsorship requests, or technical questions.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-racing-500 mx-auto animate-bounce" />
                    <h4 className="font-sans text-2xl font-bold uppercase text-white">
                      Message Dispatched Successfully!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting the Automobile Club. Your inquiry has been routed to
                      the respective executive lead. We typically respond within 24–48 hours.
                    </p>
                    <div className="pt-4">
                      <Button onClick={handleReset} variant="secondary" size="md">
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Henderson"
                          className={`w-full px-3.5 py-2.5 bg-[#141724] border rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.name ? "border-racing-500" : "border-[#262c3e] focus:border-racing-500"
                          }`}
                        />
                        {errors.name && (
                          <span className="mt-1 text-[11px] font-mono text-racing-500 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@university.edu"
                          className={`w-full px-3.5 py-2.5 bg-[#141724] border rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.email ? "border-racing-500" : "border-[#262c3e] focus:border-racing-500"
                          }`}
                        />
                        {errors.email && (
                          <span className="mt-1 text-[11px] font-mono text-racing-500 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interest Area & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                          Interest Area
                        </label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#141724] border border-[#262c3e] focus:border-racing-500 rounded-sm text-xs text-white focus:outline-none"
                        >
                          <option value="Recruitment">Student Recruitment (Join Team)</option>
                          <option value="Sponsorship">Industry Sponsorship</option>
                          <option value="Workshops">Technical Workshop Pass</option>
                          <option value="Research">Research / Academic Project</option>
                          <option value="General">General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="e.g. Inquiring regarding CAD division"
                          className={`w-full px-3.5 py-2.5 bg-[#141724] border rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.subject ? "border-racing-500" : "border-[#262c3e] focus:border-racing-500"
                          }`}
                        />
                        {errors.subject && (
                          <span className="mt-1 text-[11px] font-mono text-racing-500 block">
                            {errors.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1.5">
                        Message Details *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please include your university ID/year if inquiring about joining, or company background for sponsorship..."
                        className={`w-full px-3.5 py-2.5 bg-[#141724] border rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.message ? "border-racing-500" : "border-[#262c3e] focus:border-racing-500"
                        }`}
                      />
                      {errors.message && (
                        <span className="mt-1 text-[11px] font-mono text-racing-500 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-400">
                        * All fields marked with asterisk are required
                      </span>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Transmitting..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
