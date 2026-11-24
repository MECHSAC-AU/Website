import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Our Contributors & Patrons",
  description: `Recognizing faculty members, industry mentors, alumni, and individual benefactors who contribute to ${siteConfig.clubName} at ${siteConfig.universityName}.`,
};

export default function ContributorsRootLayout({ children }) {
  return <>{children}</>;
}
