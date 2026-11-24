"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/data/siteConfig";
import {
  Users,
  Calendar,
  Building,
  Heart,
  Camera,
  FileText,
  UserCheck,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ExternalLink,
  Upload,
  RefreshCw,
  AlertCircle,
  Eye,
  Mail
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Active Tab: 'overview' | 'applications' | 'registrations' | 'members' | 'events' | 'sponsors' | 'contributors' | 'gallery'
  const [activeTab, setActiveTab] = useState("overview");

  // State collections
  const [applications, setApplications] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null); // { type: 'success' | 'error', text }

  // Modals state
  const [viewAppModal, setViewAppModal] = useState(null);
  const [editItemModal, setEditItemModal] = useState(null); // { type, item, isNew: boolean }
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          router.replace("/admin/login");
          return;
        }

        setCurrentUser(user);
        setAuthChecking(false);
      } catch (err) {
        console.error("Auth verification error:", err);
        router.replace("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // Load dashboard data once authenticated
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [
        appsRes,
        regsRes,
        membersRes,
        eventsRes,
        sponsorsRes,
        contribsRes,
        galleryRes,
      ] = await Promise.all([
        fetch("/api/applications").then((r) => r.json()).catch(() => ({ applications: [] })),
        fetch("/api/event-registrations").then((r) => r.json()).catch(() => ({ registrations: [] })),
        fetch("/api/admin/members").then((r) => r.json()).catch(() => ({ members: [] })),
        fetch("/api/admin/events").then((r) => r.json()).catch(() => ({ events: [] })),
        fetch("/api/admin/sponsors").then((r) => r.json()).catch(() => ({ sponsors: [] })),
        fetch("/api/admin/contributors").then((r) => r.json()).catch(() => ({ contributors: [] })),
        fetch("/api/admin/gallery").then((r) => r.json()).catch(() => ({ gallery: [] })),
      ]);

      setApplications(appsRes.applications || []);
      setRegistrations(regsRes.registrations || []);
      setMembers(membersRes.members || []);
      setEvents(eventsRes.events || []);
      setSponsors(sponsorsRes.sponsors || []);
      setContributors(contribsRes.contributors || []);
      setGallery(galleryRes.gallery || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setActionMessage({ type: "error", text: "Failed to load latest database data." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authChecking && currentUser) {
      loadAllData();
    }
  }, [authChecking, currentUser]);

  const showNotification = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 5000);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Status handler for Applications (Approve / Reject)
  const handleUpdateAppStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, reviewed_at: new Date().toISOString() } : a))
      );

      if (viewAppModal?.id === id) {
        setViewAppModal((prev) => ({ ...prev, status }));
      }

      let emailNotice = "";
      if (data.forwardedToAdmin) {
        emailNotice = " (Notice: Preview delivered to mechsac.au@gmail.com. Verify your domain at resend.com/domains for applicant delivery).";
      } else if (data.emailSent) {
        emailNotice = " Automated email dispatched.";
      } else if (data.emailError) {
        emailNotice = ` (Email notice: ${data.emailError})`;
      }

      showNotification(
        "success",
        `Application marked as ${status.toUpperCase()}.${emailNotice}`
      );
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  // Status handler for Event Registrations (Approve / Reject)
  const handleUpdateRegStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/event-registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status, reviewed_at: new Date().toISOString() } : r))
      );

      let emailNotice = "";
      if (data.forwardedToAdmin) {
        emailNotice = " (Notice: Preview delivered to mechsac.au@gmail.com. Verify your domain at resend.com/domains for attendee delivery).";
      } else if (data.emailSent) {
        emailNotice = " Automated confirmation email dispatched.";
      } else if (data.emailError) {
        emailNotice = ` (Email notice: ${data.emailError})`;
      }

      showNotification(
        "success",
        `Registration marked as ${status.toUpperCase()}.${emailNotice}`
      );
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  // Delete item handler
  const handleDeleteItem = async (endpoint, id, stateSetter, itemName) => {
    if (!confirm(`Are you sure you want to permanently delete this ${itemName}?`)) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      stateSetter((prev) => prev.filter((item) => item.id !== id));
      showNotification("success", `${itemName} deleted successfully.`);
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  // Image upload handler to Supabase Storage
  const handleImageUpload = async (e, folder = "general") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setEditItemModal((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          [folder === "sponsors" ? "logo" : folder === "contributors" ? "photo" : "image"]: data.url,
        },
      }));
      showNotification("success", "Image uploaded to Supabase Storage.");
    } catch (err) {
      showNotification("error", err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Modal Item (Create or Update)
  const handleSaveModalItem = async (e) => {
    e.preventDefault();
    if (!editItemModal) return;

    const { type, item, isNew } = editItemModal;
    const endpoint = `/api/admin/${type}`;
    const url = isNew ? endpoint : `${endpoint}/${item.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      // Update state accordingly
      if (type === "members") {
        setMembers((prev) =>
          isNew ? [...prev, data.member] : prev.map((m) => (m.id === item.id ? data.member : m))
        );
      } else if (type === "events") {
        setEvents((prev) =>
          isNew ? [data.event, ...prev] : prev.map((ev) => (ev.id === item.id ? data.event : ev))
        );
      } else if (type === "sponsors") {
        setSponsors((prev) =>
          isNew ? [...prev, data.sponsor] : prev.map((s) => (s.id === item.id ? data.sponsor : s))
        );
      } else if (type === "contributors") {
        setContributors((prev) =>
          isNew ? [...prev, data.contributor] : prev.map((c) => (c.id === item.id ? data.contributor : c))
        );
      } else if (type === "gallery") {
        setGallery((prev) =>
          isNew ? [data.item, ...prev] : prev.map((g) => (g.id === item.id ? data.item : g))
        );
      }

      showNotification("success", `${type.slice(0, -1)} saved successfully!`);
      setEditItemModal(null);
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#08090C]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-racing-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            Verifying Admin Session...
          </span>
        </div>
      </div>
    );
  }

  const pendingApps = applications.filter((a) => a.status === "pending").length;
  const pendingRegs = registrations.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 pb-24">
      {/* Top Admin Bar */}
      <header className="sticky top-16 sm:top-20 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-b border-[#1b1f2e] py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-racing-950/80 border border-racing-500/50 flex items-center justify-center text-racing-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-black text-white uppercase tracking-wider">
                  MECHSAC Control Tower
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-racing-950/60 border border-racing-500/40 text-racing-400 font-bold uppercase">
                  ADMIN
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 block">
                {currentUser?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="p-2 rounded bg-[#131622] hover:bg-[#1a1e2e] text-slate-300 hover:text-white border border-[#212638] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-racing-500" : ""}`} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded bg-[#131622] hover:bg-[#1a1e2e] text-slate-300 hover:text-white border border-[#212638] flex items-center gap-1.5 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-racing-500" />
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded bg-racing-950/60 hover:bg-racing-900/80 text-racing-300 hover:text-white border border-racing-500/40 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {actionMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 animate-fade-in">
          <div
            className={`p-3.5 rounded flex items-center gap-2.5 text-xs font-mono ${
              actionMessage.type === "success"
                ? "bg-[#0f1f18] border border-emerald-500/50 text-emerald-300"
                : "bg-racing-950/80 border border-racing-500/60 text-racing-300"
            }`}
          >
            {actionMessage.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-racing-400 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#1b1f2e]">
          {[
            { id: "overview", label: "Overview", icon: Shield },
            { id: "applications", label: `Applications (${pendingApps})`, icon: FileText, highlight: pendingApps > 0 },
            { id: "registrations", label: `Registrations (${pendingRegs})`, icon: UserCheck, highlight: pendingRegs > 0 },
            { id: "members", label: `Members (${members.length})`, icon: Users },
            { id: "events", label: `Events (${events.length})`, icon: Calendar },
            { id: "sponsors", label: `Sponsors (${sponsors.length})`, icon: Building },
            { id: "contributors", label: `Contributors (${contributors.length})`, icon: Heart },
            { id: "gallery", label: `Gallery (${gallery.length})`, icon: Camera },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-racing-600 text-white border border-racing-500 shadow-[0_0_12px_rgba(225,29,72,0.35)]"
                    : "bg-[#10121b] text-slate-300 hover:text-white border border-[#212638] hover:border-slate-500"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.highlight && !isActive ? "text-racing-400 animate-pulse" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="py-8 space-y-8 animate-fade-in">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div
                onClick={() => setActiveTab("applications")}
                className="p-5 rounded bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    MEMBERSHIP INQUIRIES
                  </span>
                  <FileText className="w-4 h-4 text-racing-500" />
                </div>
                <div className="font-sans text-3xl font-black text-white">{applications.length}</div>
                <div className="font-mono text-xs text-racing-400 mt-1">
                  {pendingApps} Pending Review
                </div>
              </div>

              <div
                onClick={() => setActiveTab("registrations")}
                className="p-5 rounded bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    EVENT PASSES
                  </span>
                  <UserCheck className="w-4 h-4 text-racing-500" />
                </div>
                <div className="font-sans text-3xl font-black text-white">{registrations.length}</div>
                <div className="font-mono text-xs text-racing-400 mt-1">
                  {pendingRegs} Pending Confirmation
                </div>
              </div>

              <div
                onClick={() => setActiveTab("members")}
                className="p-5 rounded bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    ROSTER
                  </span>
                  <Users className="w-4 h-4 text-racing-500" />
                </div>
                <div className="font-sans text-3xl font-black text-white">{members.length}</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Published Engineers</div>
              </div>

              <div
                onClick={() => setActiveTab("sponsors")}
                className="p-5 rounded bg-[#0f1118] border border-[#212638] hover:border-racing-500/70 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    PARTNERS
                  </span>
                  <Building className="w-4 h-4 text-racing-500" />
                </div>
                <div className="font-sans text-3xl font-black text-white">{sponsors.length}</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Sponsors & Patrons</div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded bg-[#10121b] border border-[#212638]">
              <span className="font-mono text-xs font-bold text-racing-500 uppercase tracking-widest block mb-4">
                // QUICK DATABASE ACTIONS
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    setEditItemModal({
                      type: "members",
                      isNew: true,
                      item: { name: "", role: "", category: "Core Team", department: siteConfig.departmentName, year: "3rd Year", specialization: "" },
                    })
                  }
                  className="px-4 py-2 rounded bg-[#161a27] hover:bg-racing-600 text-white font-mono text-xs uppercase tracking-wider border border-[#282e42] hover:border-racing-500 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Team Member</span>
                </button>

                <button
                  onClick={() =>
                    setEditItemModal({
                      type: "events",
                      isNew: true,
                      item: { title: "", category: "Workshop", date: "Dates will be announced", location: "Department of Mechanical Engineering", description: "" },
                    })
                  }
                  className="px-4 py-2 rounded bg-[#161a27] hover:bg-racing-600 text-white font-mono text-xs uppercase tracking-wider border border-[#282e42] hover:border-racing-500 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Event</span>
                </button>

                <button
                  onClick={() =>
                    setEditItemModal({
                      type: "sponsors",
                      isNew: true,
                      item: { name: "", description: "", partnership_year: "2026" },
                    })
                  }
                  className="px-4 py-2 rounded bg-[#161a27] hover:bg-racing-600 text-white font-mono text-xs uppercase tracking-wider border border-[#282e42] hover:border-racing-500 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sponsor</span>
                </button>

                <button
                  onClick={() =>
                    setEditItemModal({
                      type: "contributors",
                      isNew: true,
                      item: { name: "", role: "Faculty", designation: "Professor", department: siteConfig.departmentName, organization: siteConfig.universityName },
                    })
                  }
                  className="px-4 py-2 rounded bg-[#161a27] hover:bg-racing-600 text-white font-mono text-xs uppercase tracking-wider border border-[#282e42] hover:border-racing-500 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Contributor</span>
                </button>

                <button
                  onClick={() =>
                    setEditItemModal({
                      type: "gallery",
                      isNew: true,
                      item: { title: "", category: "Workshop", image: "" },
                    })
                  }
                  className="px-4 py-2 rounded bg-[#161a27] hover:bg-racing-600 text-white font-mono text-xs uppercase tracking-wider border border-[#282e42] hover:border-racing-500 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo to Gallery</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MEMBERSHIP APPLICATIONS */}
        {/* ========================================================= */}
        {activeTab === "applications" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Recruitment &amp; Membership Applications
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Submissions received from the public Join Club / Recruitment form.
                </p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="p-12 text-center bg-[#0e1018] border border-[#212638] rounded-sm text-slate-400 font-mono text-xs">
                No membership applications received yet.
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#212638] rounded-sm bg-[#0e1018]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#141724] border-b border-[#212638] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Applicant</th>
                      <th className="p-3.5">Interest Track</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1f2e]">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#121520] transition-colors">
                        <td className="p-3.5 font-sans font-bold text-white">
                          <div>{app.name}</div>
                          <div className="font-mono text-[11px] text-slate-400 font-normal">{app.email}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">{app.interest}</td>
                        <td className="p-3.5 text-slate-400 max-w-xs truncate">{app.subject}</td>
                        <td className="p-3.5 text-slate-500 text-[11px]">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              app.status === "approved"
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                                : app.status === "rejected"
                                ? "bg-racing-950/80 text-racing-400 border border-racing-500/40"
                                : "bg-amber-950/80 text-amber-400 border border-amber-500/40"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setViewAppModal(app)}
                            className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                            title="View Message"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {app.status !== "approved" && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, "approved")}
                              className="px-2 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold"
                            >
                              Approve
                            </button>
                          )}
                          {app.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, "rejected")}
                              className="px-2 py-1 rounded bg-racing-950/60 hover:bg-racing-900/80 text-racing-300 border border-racing-500/40 text-[10px] uppercase font-bold"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteItem("/api/applications", app.id, setApplications, "Application")
                            }
                            className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: EVENT REGISTRATIONS */}
        {/* ========================================================= */}
        {activeTab === "registrations" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Event Seat Registrations
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Attendee pass requests submitted via event detail modals.
                </p>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="p-12 text-center bg-[#0e1018] border border-[#212638] rounded-sm text-slate-400 font-mono text-xs">
                No event registrations received yet.
              </div>
            ) : (
              <div className="overflow-x-auto border border-[#212638] rounded-sm bg-[#0e1018]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#141724] border-b border-[#212638] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Attendee</th>
                      <th className="p-3.5">Event</th>
                      <th className="p-3.5">Date Registered</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1f2e]">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-[#121520] transition-colors">
                        <td className="p-3.5 font-sans font-bold text-white">
                          <div>{reg.name}</div>
                          <div className="font-mono text-[11px] text-slate-400 font-normal">{reg.email}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">{reg.event_title}</td>
                        <td className="p-3.5 text-slate-500 text-[11px]">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              reg.status === "approved"
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                                : reg.status === "rejected"
                                ? "bg-racing-950/80 text-racing-400 border border-racing-500/40"
                                : "bg-amber-950/80 text-amber-400 border border-amber-500/40"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          {reg.status !== "approved" && (
                            <button
                              onClick={() => handleUpdateRegStatus(reg.id, "approved")}
                              className="px-2 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold"
                            >
                              Confirm Seat
                            </button>
                          )}
                          {reg.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateRegStatus(reg.id, "rejected")}
                              className="px-2 py-1 rounded bg-racing-950/60 hover:bg-racing-900/80 text-racing-300 border border-racing-500/40 text-[10px] uppercase font-bold"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteItem("/api/event-registrations", reg.id, setRegistrations, "Registration")
                            }
                            className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TEAM MEMBERS CRUD */}
        {/* ========================================================= */}
        {activeTab === "members" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Team Members Directory
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Manage roster records published on the public /team page.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditItemModal({
                    type: "members",
                    isNew: true,
                    item: {
                      name: "",
                      role: "",
                      category: "Core Team",
                      department: siteConfig.departmentName,
                      year: "3rd Year",
                      specialization: "",
                      focus: "",
                      bio: "",
                      image: "",
                      linkedin: "",
                      email: "",
                    },
                  })
                }
                className="px-4 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded bg-[#0e1018] border border-[#212638] flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 rounded bg-[#141724] border border-[#22273a] overflow-hidden shrink-0">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Users className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[9px] text-racing-500 uppercase tracking-widest block">
                        {member.category}
                      </span>
                      <h4 className="font-sans text-base font-bold text-white uppercase truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs text-slate-300 truncate">{member.role}</p>
                      <p className="font-mono text-[10px] text-slate-400 mt-1">
                        {member.year || "Year TBA"} • {member.department ? member.department.replace("Department of ", "") : "Mech Eng"}
                      </p>
                      <p className="font-mono text-[10px] text-racing-400 mt-0.5 truncate">
                        FOCUS: {member.specialization || member.focus || "Automotive Engineering"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {(member.linkedin || member.social?.linkedin) && (
                          <a
                            href={member.linkedin || member.social?.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3 text-racing-500" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {(member.email || member.social?.email) && (
                          <a
                            href={`mailto:${member.email || member.social?.email}`}
                            className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3 text-racing-500" />
                            <span className="truncate max-w-[120px]">{member.email || member.social?.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1b1f2e] flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        setEditItemModal({
                          type: "members",
                          isNew: false,
                          item: {
                            ...member,
                            specialization: member.specialization || member.focus || "",
                            focus: member.specialization || member.focus || "",
                            year: member.year || "",
                            department: member.department || siteConfig.departmentName,
                            linkedin: member.linkedin || member.social?.linkedin || "",
                            email: member.email || member.social?.email || "",
                          },
                        })
                      }
                      className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteItem("/api/admin/members", member.id, setMembers, "Member")
                      }
                      className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: EVENTS CRUD */}
        {/* ========================================================= */}
        {activeTab === "events" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Events &amp; Calendar Management
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Manage workshops, technical masterclasses, and inauguration events on /events.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditItemModal({
                    type: "events",
                    isNew: true,
                    item: {
                      title: "",
                      category: "Workshop",
                      date: "Dates will be announced",
                      day: "TBA",
                      month: "DATE",
                      year: "2026",
                      time: "Schedule will be announced",
                      location: "Department of Mechanical Engineering, Aliah University",
                      description: "",
                      seats: "Open to All Students & Faculty",
                      image: "",
                      featured: false,
                      is_past: false,
                    },
                  })
                }
                className="px-4 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded bg-[#0e1018] border border-[#212638] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {ev.image ? (
                      <div className="w-16 h-16 rounded overflow-hidden bg-black/80 border border-[#262c3e] shrink-0">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded bg-black/80 border border-racing-500/40 flex flex-col items-center justify-center text-center shrink-0">
                        <span className="font-sans text-base font-black text-white leading-none">
                          {ev.day || "TBA"}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-racing-500 uppercase mt-0.5">
                          {ev.month || "DATE"}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-mono text-[9px] text-racing-500 uppercase font-semibold">
                        {ev.category} {ev.is_past ? "• PAST ARCHIVE" : "• UPCOMING"}
                      </span>
                      <h4 className="font-sans text-lg font-bold text-white uppercase">{ev.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {ev.date} • {ev.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setEditItemModal({ type: "events", isNew: false, item: { ...ev, image: ev.image || "" } })}
                      className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("/api/admin/events", ev.id, setEvents, "Event")}
                      className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SPONSORS CRUD */}
        {/* ========================================================= */}
        {activeTab === "sponsors" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Corporate Sponsors
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Manage official industry sponsors showcased on /sponsors.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditItemModal({
                    type: "sponsors",
                    isNew: true,
                    item: {
                      name: "",
                      description: "",
                      website: "",
                      partnership_year: "2026",
                      logo: "",
                    },
                  })
                }
                className="px-4 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sponsor</span>
              </button>
            </div>

            {sponsors.length === 0 ? (
              <div className="p-12 text-center bg-[#0e1018] border border-[#212638] rounded-sm text-slate-400 font-mono text-xs">
                No sponsors added yet. Click &quot;Add Sponsor&quot; to publish your first partner.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-5 rounded bg-[#0e1018] border border-[#212638] flex flex-col justify-between"
                  >
                    <div>
                      {sp.logo && (
                        <div className="h-14 mb-3 flex items-center justify-center p-2 bg-[#131622] rounded">
                          <img src={sp.logo} alt={sp.name} className="max-h-full object-contain" />
                        </div>
                      )}
                      <h4 className="font-sans text-base font-bold text-white uppercase">{sp.name}</h4>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{sp.description}</p>
                      <p className="font-mono text-[10px] text-slate-500 mt-2">
                        PARTNER // {sp.partnership_year || "2026"}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1b1f2e] flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditItemModal({ type: "sponsors", isNew: false, item: { ...sp } })}
                        className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("/api/admin/sponsors", sp.id, setSponsors, "Sponsor")}
                        className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: CONTRIBUTORS CRUD */}
        {/* ========================================================= */}
        {activeTab === "contributors" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Our Contributors Directory
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Manage faculty members, mentors, and supporters shown on /sponsors/contributors.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditItemModal({
                    type: "contributors",
                    isNew: true,
                    item: {
                      name: "",
                      role: "Faculty",
                      designation: "Professor",
                      department: siteConfig.departmentName,
                      organization: siteConfig.universityName,
                      contribution_message: "",
                      year: "2026",
                      photo: "",
                    },
                  })
                }
                className="px-4 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Contributor</span>
              </button>
            </div>

            {contributors.length === 0 ? (
              <div className="p-12 text-center bg-[#0e1018] border border-[#212638] rounded-sm text-slate-400 font-mono text-xs">
                No contributors added yet. Click &quot;Add Contributor&quot; to publish a patron profile.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributors.map((contrib) => (
                  <div
                    key={contrib.id}
                    className="p-5 rounded bg-[#0e1018] border border-[#212638] flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[9px] text-racing-500 uppercase tracking-widest block mb-1">
                        {contrib.role}
                      </span>
                      <h4 className="font-sans text-base font-bold text-white uppercase">{contrib.name}</h4>
                      <p className="text-xs text-slate-300 font-medium">{contrib.designation}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {contrib.department} {contrib.department && contrib.organization && "•"} {contrib.organization}
                      </p>
                      {contrib.contribution_message && (
                        <p className="text-xs text-slate-400 italic mt-2 line-clamp-2">
                          &ldquo;{contrib.contribution_message}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1b1f2e] flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          setEditItemModal({ type: "contributors", isNew: false, item: { ...contrib } })
                        }
                        className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteItem(
                            "/api/admin/contributors",
                            contrib.id,
                            setContributors,
                            "Contributor"
                          )
                        }
                        className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: GALLERY CRUD */}
        {/* ========================================================= */}
        {activeTab === "gallery" && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-bold uppercase text-white">
                  Photo &amp; Media Gallery
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Upload high-res workshop, CAD, and track photos published on /gallery.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditItemModal({
                    type: "gallery",
                    isNew: true,
                    item: {
                      title: "",
                      category: "Workshop",
                      image: "",
                      date: "2026",
                      location: "Mechanical Workshop Bay",
                      caption: "",
                    },
                  })
                }
                className="px-4 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            {gallery.length === 0 ? (
              <div className="p-12 text-center bg-[#0e1018] border border-[#212638] rounded-sm text-slate-400 font-mono text-xs">
                No gallery pictures uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded bg-[#0e1018] border border-[#212638] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] rounded bg-black/60 overflow-hidden mb-3">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-sans text-sm font-bold text-white uppercase truncate">
                        {item.title}
                      </h4>
                      <p className="font-mono text-[10px] text-slate-500">{item.category} • {item.location}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#1b1f2e] flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditItemModal({ type: "gallery", isNew: false, item: { ...item } })}
                        className="p-1.5 rounded bg-[#161a27] text-slate-300 hover:text-white border border-[#23283c]"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteItem("/api/admin/gallery", item.id, setGallery, "Gallery Item")
                        }
                        className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-racing-400 border border-[#23283c]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: VIEW APPLICATION DETAILS */}
      {/* ========================================================= */}
      {viewAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0f1118] border border-[#262c3e] rounded-sm max-w-lg w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b1f2e] pb-3">
              <div>
                <span className="font-mono text-[10px] text-racing-500 uppercase tracking-widest block">
                  APPLICATION DETAILS
                </span>
                <h3 className="font-sans text-lg font-bold text-white uppercase">{viewAppModal.name}</h3>
              </div>
              <button
                onClick={() => setViewAppModal(null)}
                className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div><strong>EMAIL:</strong> {viewAppModal.email}</div>
              <div><strong>INTEREST:</strong> {viewAppModal.interest}</div>
              <div><strong>SUBJECT:</strong> {viewAppModal.subject}</div>
              <div><strong>DATE:</strong> {new Date(viewAppModal.created_at).toLocaleString()}</div>
              <div>
                <strong>STATUS:</strong>{" "}
                <span className="px-2 py-0.5 rounded uppercase font-bold text-[10px] bg-racing-950 border border-racing-500/40 text-racing-400">
                  {viewAppModal.status}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-[11px] text-slate-400 uppercase block mb-1">Message:</span>
              <div className="p-3.5 rounded bg-[#141724] border border-[#23283c] text-xs text-slate-200 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {viewAppModal.message}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1b1f2e] flex items-center justify-end gap-2">
              <button
                onClick={() => handleUpdateAppStatus(viewAppModal.id, "approved")}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold"
              >
                Approve &amp; Send Email
              </button>
              <button
                onClick={() => handleUpdateAppStatus(viewAppModal.id, "rejected")}
                className="px-3 py-1.5 rounded bg-racing-700 hover:bg-racing-600 text-white font-mono text-xs uppercase font-bold"
              >
                Reject &amp; Send Email
              </button>
              <button
                onClick={() => setViewAppModal(null)}
                className="px-3 py-1.5 rounded bg-[#161a27] text-slate-400 hover:text-white font-mono text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT CONTENT FORM WITH STORAGE UPLOAD */}
      {/* ========================================================= */}
      {editItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0f1118] border border-[#262c3e] rounded-sm max-w-xl w-full p-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-[#1b1f2e] pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] text-racing-500 uppercase tracking-widest block">
                  {editItemModal.isNew ? "CREATE RECORD" : "EDIT RECORD"}
                </span>
                <h3 className="font-sans text-lg font-bold text-white uppercase">
                  {editItemModal.type.toUpperCase()}
                </h3>
              </div>
              <button
                onClick={() => setEditItemModal(null)}
                className="p-1.5 rounded bg-[#161a27] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="space-y-4">
              {/* Dynamic Fields based on Type */}

              {/* Title / Name */}
              <div>
                <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                  {editItemModal.type === "events" ? "Event Title *" : "Name / Title *"}
                </label>
                <input
                  type="text"
                  required
                  value={
                    editItemModal.type === "events"
                      ? editItemModal.item.title || ""
                      : editItemModal.item.name || editItemModal.item.title || ""
                  }
                  onChange={(e) =>
                    setEditItemModal((prev) => ({
                      ...prev,
                      item: {
                        ...prev.item,
                        [editItemModal.type === "events" ? "title" : "name"]: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                />
              </div>

              {/* Category / Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                    {editItemModal.type === "members"
                      ? "Role / Position *"
                      : editItemModal.type === "contributors"
                      ? "Role (Faculty/Mentor/Supporter) *"
                      : "Category"}
                  </label>
                  <input
                    type="text"
                    required={editItemModal.type === "members" || editItemModal.type === "contributors"}
                    value={
                      editItemModal.type === "members" || editItemModal.type === "contributors"
                        ? editItemModal.item.role || ""
                        : editItemModal.item.category || ""
                    }
                    onChange={(e) =>
                      setEditItemModal((prev) => ({
                        ...prev,
                        item: {
                          ...prev.item,
                          [editItemModal.type === "members" || editItemModal.type === "contributors"
                            ? "role"
                            : "category"]: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                  />
                </div>

                {editItemModal.type === "members" && (
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                      Division Category
                    </label>
                    <select
                      value={editItemModal.item.category || "Core Team"}
                      onChange={(e) =>
                        setEditItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, category: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                    >
                      <option value="Executive Committee">Executive Committee</option>
                      <option value="Technical Team">Technical Team</option>
                      <option value="Core Team">Core Team</option>
                      <option value="Junior Engineer">Junior Engineer</option>
                    </select>
                  </div>
                )}

                {editItemModal.type === "contributors" && (
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                      Designation / Title
                    </label>
                    <input
                      type="text"
                      value={editItemModal.item.designation || ""}
                      onChange={(e) =>
                        setEditItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, designation: e.target.value },
                        }))
                      }
                      placeholder="e.g. Professor & Head"
                      className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Member-specific fields: Focus, Year, Department, Social Links */}
              {editItemModal.type === "members" && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                        Focus / Specialization
                      </label>
                      <input
                        type="text"
                        value={editItemModal.item.specialization || editItemModal.item.focus || ""}
                        onChange={(e) =>
                          setEditItemModal((prev) => ({
                            ...prev,
                            item: {
                              ...prev.item,
                              specialization: e.target.value,
                              focus: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Chassis Dynamics & Suspension"
                        className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                        Academic Year / Standing
                      </label>
                      <input
                        type="text"
                        value={editItemModal.item.year || ""}
                        onChange={(e) =>
                          setEditItemModal((prev) => ({
                            ...prev,
                            item: { ...prev.item, year: e.target.value },
                          }))
                        }
                        placeholder="e.g. 4th Year // Senior"
                        className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editItemModal.item.department || ""}
                      onChange={(e) =>
                        setEditItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, department: e.target.value },
                        }))
                      }
                      placeholder={`e.g. ${siteConfig.departmentName}`}
                      className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={editItemModal.item.linkedin || ""}
                        onChange={(e) =>
                          setEditItemModal((prev) => ({
                            ...prev,
                            item: { ...prev.item, linkedin: e.target.value },
                          }))
                        }
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                        Member Email Address
                      </label>
                      <input
                        type="email"
                        value={editItemModal.item.email || ""}
                        onChange={(e) =>
                          setEditItemModal((prev) => ({
                            ...prev,
                            item: { ...prev.item, email: e.target.value },
                          }))
                        }
                        placeholder="member@university.edu"
                        className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Event Specific fields */}
              {editItemModal.type === "events" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                      Date String
                    </label>
                    <input
                      type="text"
                      value={editItemModal.item.date || ""}
                      onChange={(e) =>
                        setEditItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, date: e.target.value },
                        }))
                      }
                      placeholder="e.g. Dates will be announced"
                      className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={editItemModal.item.location || ""}
                      onChange={(e) =>
                        setEditItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, location: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Description / Message / Bio */}
              <div>
                <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                  {editItemModal.type === "contributors"
                    ? "Contribution Message / Quote"
                    : editItemModal.type === "members"
                    ? "Bio"
                    : "Description"}
                </label>
                <textarea
                  rows="3"
                  value={
                    editItemModal.item.description ||
                    editItemModal.item.bio ||
                    editItemModal.item.contribution_message ||
                    ""
                  }
                  onChange={(e) => {
                    const key =
                      editItemModal.type === "contributors"
                        ? "contribution_message"
                        : editItemModal.type === "members"
                        ? "bio"
                        : "description";
                    setEditItemModal((prev) => ({
                      ...prev,
                      item: { ...prev.item, [key]: e.target.value },
                    }));
                  }}
                  className="w-full px-3 py-2 bg-[#141724] border border-[#262c3e] rounded-sm text-xs text-white focus:border-racing-500 focus:outline-none"
                />
              </div>

              {/* Supabase Storage Image Upload */}
              <div className="p-4 rounded bg-[#131622] border border-[#212638] space-y-3">
                <label className="block font-mono text-[11px] text-slate-300 uppercase flex items-center justify-between">
                  <span>Photo / Image Asset (Supabase Storage)</span>
                  {uploadingImage && <span className="text-racing-400 animate-pulse">Uploading to Supabase...</span>}
                </label>

                {/* Live Preview if an image is attached */}
                {(editItemModal.item.image || editItemModal.item.logo || editItemModal.item.photo) && (
                  <div className="relative w-full h-36 rounded bg-[#0c0e14] border border-[#282e44] overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={editItemModal.item.image || editItemModal.item.logo || editItemModal.item.photo}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-racing-400 border border-racing-500/30 uppercase">
                      Live Preview
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-2 rounded bg-[#1c2233] hover:bg-racing-600 text-white font-mono text-xs uppercase flex items-center gap-2 border border-[#282e42] transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File to Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, editItemModal.type)}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="or enter image URL..."
                    value={
                      editItemModal.item.image ||
                      editItemModal.item.logo ||
                      editItemModal.item.photo ||
                      ""
                    }
                    onChange={(e) => {
                      const key =
                        editItemModal.type === "sponsors"
                          ? "logo"
                          : editItemModal.type === "contributors"
                          ? "photo"
                          : "image";
                      setEditItemModal((prev) => ({
                        ...prev,
                        item: { ...prev.item, [key]: e.target.value },
                      }));
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#0f1118] border border-[#262c3e] rounded-sm text-xs text-slate-300 focus:border-racing-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-[#1b1f2e] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditItemModal(null)}
                  className="px-4 py-2 font-mono text-xs uppercase text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-racing-600 hover:bg-racing-500 text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
