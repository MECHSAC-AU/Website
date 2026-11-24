import { createClient } from "@supabase/supabase-js";
import { membersData as fallbackMembers } from "@/data/members";
import { eventsData as fallbackEvents } from "@/data/events";
import { sponsorsData as fallbackSponsors } from "@/data/sponsors";
import { contributorsData as fallbackContributors } from "@/data/contributors";
import { galleryData as fallbackGallery } from "@/data/gallery";

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }
  return createClient(url, anonKey);
}

/**
 * Fetch live team members from Supabase, fallback to static data
 */
export async function getLiveMembers() {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackMembers;

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackMembers;
    }

    return data.map((m) => {
      const linkedin = m.linkedin || m.social?.linkedin || "";
      const email = m.email || m.social?.email || "";
      const github = m.github || m.social?.github || "";
      return {
        ...m,
        specialization: m.specialization || m.focus || "",
        focus: m.specialization || m.focus || "",
        department: m.department || "",
        year: m.year || "",
        linkedin,
        email,
        social: {
          linkedin,
          github,
          email,
        },
      };
    });
  } catch (err) {
    console.warn("Error fetching live members, using fallback:", err.message);
    return fallbackMembers;
  }
}

/**
 * Fetch live events from Supabase, fallback to static data
 */
export async function getLiveEvents() {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackEvents;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackEvents;
    }

    const upcoming = data.filter((e) => !e.is_past);
    const past = data.filter((e) => e.is_past);

    return {
      upcoming: upcoming.length > 0 ? upcoming : fallbackEvents.upcoming,
      past: past,
    };
  } catch (err) {
    console.warn("Error fetching live events, using fallback:", err.message);
    return fallbackEvents;
  }
}

/**
 * Fetch live sponsors from Supabase, fallback to static data
 */
export async function getLiveSponsors() {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackSponsors;

    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackSponsors;
    }

    return data.map((s) => ({
      ...s,
      partnershipYear: s.partnership_year || s.partnershipYear || "2026",
    }));
  } catch (err) {
    console.warn("Error fetching live sponsors, using fallback:", err.message);
    return fallbackSponsors;
  }
}

/**
 * Fetch live contributors from Supabase, fallback to static data
 */
export async function getLiveContributors() {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackContributors;

    const { data, error } = await supabase
      .from("contributors")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackContributors;
    }

    return data.map((c) => ({
      ...c,
      contributionMessage: c.contribution_message || c.contributionMessage || "",
      social: {
        linkedin: c.linkedin || c.social?.linkedin || "",
      },
    }));
  } catch (err) {
    console.warn("Error fetching live contributors, using fallback:", err.message);
    return fallbackContributors;
  }
}

/**
 * Fetch live gallery items from Supabase, fallback to static data
 */
export async function getLiveGallery() {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackGallery;

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackGallery;
    }

    return data;
  } catch (err) {
    console.warn("Error fetching live gallery, using fallback:", err.message);
    return fallbackGallery;
  }
}
