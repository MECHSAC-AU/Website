/**
 * Contributors Data
 * 
 * Manages individuals, faculty members, mentors, and supporters who
 * financially contribute to MECHSAC at Aliah University.
 * 
 * HOW TO ADD A NEW CONTRIBUTOR:
 * Simply add an object to `contributorsData` following this schema:
 * {
 *   id: "contrib-01",
 *   name: "Full Name",
 *   photo: "/images/contributors/person.jpg", // optional (null or omit for clean avatar placeholder)
 *   role: "Faculty Member", // e.g. 'Faculty', 'Mentor', 'Individual Supporter', etc.
 *   designation: "Associate Professor / Senior Engineer", // Specific title or designation
 *   department: "Department of Mechanical Engineering", // Optional
 *   organization: "Aliah University", // Optional
 *   contributionMessage: "Brief message or note regarding their contribution.", // Optional
 *   year: "2026", // Optional
 *   social: { linkedin: "https://..." } // Optional
 * }
 */

// Contributors list (add new supporters as they join)
export const contributorsData = [];
