export const eventsData = {
  upcoming: [
    {
      id: "evt-01",
      title: "Annual Formula Student Rollout & Vehicle Unveil 2026",
      category: "Launch",
      date: "OCT 28, 2026",
      day: "28",
      month: "OCT",
      year: "2026",
      time: "14:00 – 17:30",
      location: "Mechanical Engineering Quad & Main Auditorium",
      room: "[MAIN CAMPUS - AUDITORIUM]",
      image: "/images/events/event-01.jpg",
      description: "Official public unveiling of the Apex-26 racecar. Features live technical demonstrations, CFD wind tunnel simulation breakdowns by leads, sponsor acknowledgments, and driver cockpit previews.",
      featured: true,
      seats: "200 Attendees",
      tags: ["Formula Student", "Vehicle Launch", "Technical Showcase"]
    },
    {
      id: "evt-02",
      title: "Masterclass: Computational Fluid Dynamics with Ansys Fluent",
      category: "Workshop",
      date: "NOV 12, 2026",
      day: "12",
      month: "NOV",
      year: "2026",
      time: "10:00 – 16:00",
      location: "CAD Simulation Lab 304, Mech Block",
      room: "Lab 304",
      image: "/images/events/event-02.jpg",
      description: "A hands-on, intensive software workshop covering automotive surface meshing, turbulence models (k-omega SST), wing ground-effect modeling, and drag-reduction optimization.",
      featured: false,
      seats: "40 Workstations",
      tags: ["Ansys Fluent", "Aerodynamics", "CAD / CFD"]
    },
    {
      id: "evt-03",
      title: "High-Voltage Electric Powertrain & BMS Architecture Seminar",
      category: "Seminar",
      date: "NOV 26, 2026",
      day: "26",
      month: "NOV",
      year: "2026",
      time: "15:00 – 18:00",
      location: "Department Seminar Hall B",
      room: "Hall B",
      image: "/images/events/event-03.jpg",
      description: "Guest lecture with OEM motorsport battery engineers discussing isolation monitoring, active thermal balancing, and inverter switching harmonics in Formula Student electric cars.",
      featured: false,
      seats: "120 Attendees",
      tags: ["EV Tech", "Power Electronics", "Guest Lecture"]
    },
    {
      id: "evt-04",
      title: "Intra-Collegiate Go-Kart Engineering Sprint",
      category: "Competition",
      date: "DEC 10, 2026",
      day: "10",
      month: "DEC",
      year: "2026",
      time: "09:00 – 18:00",
      location: "Automobile Club Workshop Bay & Parking P-4",
      room: "Workshop Bay",
      image: "/images/events/event-04.jpg",
      description: "Inter-batch design sprint where 6 teams build, tune, and race spec karts across acceleration, skidpad, and autocross mini-circuits.",
      featured: false,
      seats: "Open to University Students",
      tags: ["Racing", "Hands-on", "Competition"]
    }
  ],
  past: [
    {
      id: "evt-p01",
      title: "National Formula Student Dynamic Trials 2026",
      category: "Competition",
      date: "MAR 14, 2026",
      location: "National Motorsport Raceway, Circuit Bay 3",
      recap: "Our team clocked top-3 times in skidpad and finished all 22km of the endurance event with zero mechanical breakdowns. Data logger confirmed 1.6G sustained lateral grip.",
      image: "/images/events/event-past-01.jpg",
      awards: "Top 5 Overall Dynamic Finish",
      attendance: "35 University Teams"
    },
    {
      id: "evt-p02",
      title: "Advanced TIG Welding & Chromoly Fabrication Bootcamp",
      category: "Workshop",
      date: "FEB 20, 2026",
      location: "Central Machine Shop, Mech Lab 01",
      recap: "Trained 30 incoming student engineers in argon back-purging, tube notching tolerances under 0.2mm, and structural cage stress test preparation.",
      image: "/images/events/event-past-02.jpg",
      awards: "Certified 30 Students",
      attendance: "30 Participants"
    },
    {
      id: "evt-p03",
      title: "Automotive Industry Day & Alumni Panel",
      category: "Industry",
      date: "NOV 15, 2025",
      location: "Engineering Auditorium",
      recap: "Connected our student engineers with 6 prominent alumni working at leading automotive OEMs and racing teams. Covered recruitment, telemetry portfolios, and EV R&D trends.",
      image: "/images/events/event-past-03.jpg",
      awards: "4 Summer Internships Secured",
      attendance: "180 Attendees"
    },
    {
      id: "evt-p04",
      title: "Vehicle Dynamics Telemetry Hackathon",
      category: "Hackathon",
      date: "SEP 28, 2025",
      location: "Mechatronics Lab 102",
      recap: "48-hour coding sprint building custom dashboard displays and MATLAB scripts to process CAN bus logs for tire slip angle analysis.",
      image: "/images/events/event-past-04.jpg",
      awards: "3 Winning Telemetry Dashboards",
      attendance: "65 Students"
    }
  ]
};

export const eventCategories = [
  "All",
  "Launch",
  "Workshop",
  "Seminar",
  "Competition",
  "Industry"
];
