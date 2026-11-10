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
      room: "Main Auditorium, Aliah University",
      image: "/images/events/event-01.jpg",
      description: "Official public unveiling of the Apex-26 racecar. Features live technical demonstrations, CFD wind tunnel simulation breakdowns by leads, and driver cockpit previews.",
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
      description: "Seminar with motorsport battery engineers discussing isolation monitoring, active thermal balancing, and inverter switching harmonics in student electric cars.",
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
      location: "MECHSAC Workshop Bay & Parking P-4",
      room: "Workshop Bay",
      image: "/images/events/event-04.jpg",
      description: "Inter-batch design sprint where student teams build, tune, and test spec karts across acceleration, skidpad, and autocross mini-circuits.",
      featured: false,
      seats: "Open to University Students",
      tags: ["Racing", "Hands-on", "Competition"]
    }
  ],
  past: [
    {
      id: "evt-p01",
      title: "MECHSAC Foundation Assembly & Student Orientation 2026",
      category: "Launch",
      date: "FEB 15, 2026",
      location: "Department of Mechanical Engineering, Aliah University",
      recap: "Official inauguration of MECHSAC. 110+ students registered and joined engineering divisions across chassis, powertrain, electronics, and aerodynamics.",
      image: "/images/events/event-past-01.jpg",
      awards: "110+ Members Inducted",
      attendance: "110+ Students"
    },
    {
      id: "evt-p02",
      title: "Chassis Design & Spaceframe CAD Induction",
      category: "Workshop",
      date: "MAR 02, 2026",
      location: "CAD Lab 304, Aliah University",
      recap: "Hands-on training session on 4130 Chromoly tubular subframes, parametric modeling, and tube notching tolerances under 0.2mm.",
      image: "/images/events/event-past-02.jpg",
      awards: "Inaugural Workshop",
      attendance: "45 Participants"
    }
  ]
};

export const eventCategories = [
  "All",
  "Launch",
  "Workshop",
  "Seminar",
  "Competition"
];
