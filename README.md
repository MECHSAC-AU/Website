# Automobile Club Website
### Department of Mechanical Engineering — Student Motorsport & Mobility Organization

A fully responsive, modern web application built from scratch for a university Automobile Club. Designed with a motorsport/engineering identity — featuring deep dark surfaces, racing crimson accents, technical telemetry coordinates, interactive project spec drawers, client-side category filtering, and an accessible media lightbox.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: Pure JavaScript (`.js` / `.jsx` — **NO TypeScript**)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom CSS Variables & Technical Grids
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Architecture**: Decoupled static JavaScript mock files (`data/*.js`)
- **Backend / DB / CMS**: None (Frontend-only; ready for future headless CMS/API connection)

---

## 🧭 Page Routes

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Immersive Hero, Editorial Introduction, "What We Do" Capabilities, Featured Case Study, Horizontal Project Carousel, Upcoming Events, Leadership Preview, National Achievements, Masonry Gallery Preview, Call to Action |
| `/about` | **About the Club** | Origins & Story, Mission & Vision, 5 Core Principles, Faculty Advisor Spotlight, R&D Facilities & Equipment Bays |
| `/team` | **Team / Members** | Filterable team directory across 6 engineering divisions with member specializations, bios, and social channels |
| `/projects` | **Projects Portfolio** | Interactive project filter (All, Motorsports, EV, Vehicle Design, Fabrication, Robotics, Research) + Search input + Technical Spec Modal |
| `/events` | **Events Schedule** | Upcoming and Past event tabs, countdowns, race recaps, and interactive event registration modal |
| `/gallery` | **Photo & Media Archive** | Masonry-style grid, category filtering, hover zooms, and full interactive Lightbox with Next/Prev/Esc controls |
| `/achievements` | **Achievements** | Big-typography metric counters, chronological podium timeline, and regulatory safety certifications |
| `/contact` | **Contact & Bay Access** | Editorial layout, workshop bay hours, location metadata, and frontend validated contact/application form with simulated success state |

---

## 🎨 Color System & Customization

The color system is centralized and fully customizable:
- **Primary Accent**: Racing Crimson (`#E11D48`)
- **Hover Accent**: `#BE123C`
- **Surface Dark**: `#08090C` / `#0F1117` / `#141722`
- **Border**: `#212638` / `#2B334A`

To change the accent color across the entire application:
1. Update `data/siteConfig.js` (`theme.accentColor`).
2. Update CSS variables in `app/globals.css` (`--accent-color`, `--accent-hover`, `--accent-glow`).
3. Update `tailwind.config.js` (`colors.racing`).

---

## 📂 Placeholder Asset System

All images use clearly designated local paths under `/public/images/`:
```
public/images/
├── hero/          # hero-car.jpg, hero-poster.jpg
├── logos/         # club-logo.png, university-logo.png, department-logo.png
├── projects/      # project-01.jpg through project-07.jpg (+ sub-gallery views)
├── members/       # member-01.jpg through member-14.jpg
├── events/        # event-01.jpg through event-04.jpg (+ past events)
├── gallery/       # gallery-01.jpg through gallery-12.jpg
└── faculty/       # faculty-advisor.jpg
```

### Automatic Visual Fallback
If an image file is missing or fails to load, `components/ImagePlaceholder.js` gracefully renders a high-tech dark automotive placeholder block complete with:
- Subtle carbon grid overlay
- Red corner crosshairs & brackets
- Telemetry badges (`SPEC // PROJ-01`, etc.)
- Specific target file path reminder

To replace placeholders with real photos, simply drop your files with the same filenames into the respective `/public/images/` folders.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
Runs the optimized static production server on port 3000.
