import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/siteConfig";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090C",
};

export const metadata = {
  title: {
    default: `${siteConfig.clubName} | ${siteConfig.departmentName}`,
    template: `%s | ${siteConfig.clubName}`,
  },
  description: `${siteConfig.clubName} — ${siteConfig.subTitle}, ${siteConfig.universityName}. Student automotive engineering organization dedicated to motorsport, vehicle dynamics, CAD/CFD, and sustainable mobility.`,
  keywords: [
    "Automobile Club",
    "Formula Student",
    "Mechanical Engineering",
    "Motorsports",
    "Automotive Design",
    "Vehicle Dynamics",
    "CAD",
    "CFD",
    "Electric Vehicle",
  ],
  authors: [{ name: `${siteConfig.clubName} Engineering Team` }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#08090C] text-slate-100 min-h-screen antialiased flex flex-col font-sans selection:bg-racing-600 selection:text-white">
        {/* Subtle persistent top coordinate line */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-racing-500/40 to-transparent z-50 pointer-events-none" />

        <Navbar />
        
        {/* Main Content with top padding for fixed navbar */}
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
