export const projectsData = [
  {
    id: "proj-01",
    number: "01",
    title: "Apex-26 Formula Student Prototype",
    category: "Motorsports",
    year: "2026",
    status: "Competition Ready",
    featured: true,
    tagline: "Ultra-lightweight multi-link open-wheel racer engineered for dynamic autocross & endurance trials.",
    description: "The Apex-26 represents 14 months of rigorous research, CAD modeling, and precision fabrication by the Department of Mechanical Engineering Automobile Club. Designed to compete in national Formula Student design and dynamic events, the prototype features a custom tubular spaceframe chassis coupled with an aero package producing over 420N of downforce at 80 km/h.",
    heroImage: "/images/projects/project-01.jpg",
    gallery: [
      "/images/projects/project-01-a.jpg",
      "/images/projects/project-01-b.jpg",
      "/images/projects/project-01-c.jpg"
    ],
    technologies: ["CAD SolidWorks", "CFD Ansys Fluent", "CNC 5-Axis", "Telemetry DAQ", "FEA Nastran", "TIG Welding"],
    specs: [
      { label: "Acceleration (0-100 km/h)", value: "3.4 sec" },
      { label: "Curb Weight (Dry)", value: "185 kg" },
      { label: "Peak Power Output", value: "72 kW (96.5 HP)" },
      { label: "Downforce @ 80 km/h", value: "420 N" },
      { label: "Torsional Stiffness", value: "1,980 Nm/deg" },
      { label: "Suspension Architecture", value: "Pushrod Double Wishbone" }
    ],
    teamLead: "Alex Morgan & Marcus Vance",
    highlights: [
      "Custom 7075-T6 aluminum CNC uprights saving 18% unsprung mass",
      "Full carbon-composite aerodynamic package with adjustable DRS",
      "Live 915 MHz wireless telemetry logging 32 channels of dynamic sensor data"
    ]
  },
  {
    id: "proj-02",
    number: "02",
    title: "VoltRush Electric Vehicle Platform",
    category: "EV",
    year: "2025",
    status: "Completed",
    featured: false,
    tagline: "400V battery-electric testbed exploring high-efficiency regenerative recovery and custom modular thermal cells.",
    description: "Developed to pioneer sustainable electric propulsion within the university, VoltRush integrates a custom liquid-cooled lithium-iron-phosphate (LiFePO4) battery enclosure, synchronous motor architecture, and proprietary battery management firmware.",
    heroImage: "/images/projects/project-02.jpg",
    gallery: [
      "/images/projects/project-02-a.jpg",
      "/images/projects/project-02-b.jpg"
    ],
    technologies: ["MATLAB / Simulink", "Battery Thermal CAD", "BMS Firmware", "CAN Bus 2.0B", "Power Electronics"],
    specs: [
      { label: "Nominal Pack Voltage", value: "400 V" },
      { label: "Battery Capacity", value: "7.8 kWh" },
      { label: "Peak Torque", value: "135 Nm" },
      { label: "Top Speed (Governed)", value: "115 km/h" },
      { label: "Regenerative Efficiency", value: "22% Recovery" }
    ],
    teamLead: "Elena Rostova & Priya Patel",
    highlights: [
      "Custom active dielectric liquid immersion cooling manifold",
      "Isolated optical CAN communication between 12 slave BMS boards",
      "Passed all regional high-voltage isolation and safety shutdown trials"
    ]
  },
  {
    id: "proj-03",
    number: "03",
    title: "AeroTrack Carbon Monocoque Chassis",
    category: "Fabrication",
    year: "2025",
    status: "Completed",
    featured: false,
    tagline: "Vacuum-infused prepreg monocoque safety cell with aerospace aluminum honeycomb cores.",
    description: "An advanced research and fabrication project investigating carbon fiber prepreg sandwich composites to replace traditional steel tubular chassis. Built in collaboration with composite manufacturing facilities and department autoclaves.",
    heroImage: "/images/projects/project-03.jpg",
    gallery: [
      "/images/projects/project-03-a.jpg"
    ],
    technologies: ["Autoclave Curing", "Prepreg Carbon Layup", "Structural FEA", "Vacuum Infusion", "Ultrasonic NDT"],
    specs: [
      { label: "Monocoque Weight", value: "24.5 kg" },
      { label: "Torsional Rigidity", value: "2,850 Nm/deg" },
      { label: "Core Material", value: "Aluminum Honeycomb (1/4\")" },
      { label: "Layup Schedule", value: "Symmetric Quasi-Isotropic" },
      { label: "Impact Attenuator", value: "Crash-box 9.8 kN tested" }
    ],
    teamLead: "Marcus Vance & Zack Thorne",
    highlights: [
      "42% weight reduction over Chromoly spaceframe equivalent",
      "Integrated front bulkhead and steering rack hardpoints",
      "Non-destructive ultrasonic testing verified zero void formation"
    ]
  },
  {
    id: "proj-04",
    number: "04",
    title: "TerraNav Autonomous Rover",
    category: "Robotics",
    year: "2024",
    status: "Completed",
    featured: false,
    tagline: "All-terrain autonomous rover featuring passive rocker-bogie kinematics and 3D LiDAR SLAM.",
    description: "Cross-disciplinary project bridging mechanical suspension dynamics with autonomous navigation. Engineered to traverse rough obstacle terrain autonomously while mapping environments using point clouds and Kalman sensor fusion.",
    heroImage: "/images/projects/project-04.jpg",
    gallery: [
      "/images/projects/project-04-a.jpg"
    ],
    technologies: ["ROS2 Humble", "LiDAR SLAM", "Computer Vision", "Rocker-Bogie Kinematics", "Embedded C++"],
    specs: [
      { label: "Obstacle Clearance", value: "1.5x Wheel Diameter" },
      { label: "Sensor Array", value: "3D LiDAR + Stereocams" },
      { label: "Localization Accuracy", value: "±2.4 cm" },
      { label: "Payload Capacity", value: "15 kg" },
      { label: "Drive Configuration", value: "6WD Independent Hub" }
    ],
    teamLead: "Kenji Sato & Lucas Rivera",
    highlights: [
      "Passive differential gimbal balancing vehicle tilt over 35-degree inclines",
      "Real-time point-cloud obstacle segmentation at 20 FPS"
    ]
  },
  {
    id: "proj-05",
    number: "05",
    title: "Kinematic Suspension & Uprights Suite",
    category: "Vehicle Design",
    year: "2025",
    status: "Completed",
    featured: false,
    tagline: "Decoupled roll and heave double-wishbone geometry optimized for transient slalom response.",
    description: "Complete overhaul of vehicle kinematics. Utilizes Adams Car multi-body simulation and custom mathematical solvers to minimize bump steer to less than 0.05 degrees throughout full suspension travel.",
    heroImage: "/images/projects/project-05.jpg",
    gallery: [
      "/images/projects/project-05-a.jpg"
    ],
    technologies: ["Adams Car", "Kinematic Solvers", "Topology Optimization", "7075-T6 Billet", "Strain Gauge DAQ"],
    specs: [
      { label: "Wheel Travel", value: "+30 mm / -25 mm" },
      { label: "Bump Steer", value: "< 0.04° over 50mm" },
      { label: "Roll Center Migration", value: "±4 mm lateral max" },
      { label: "Damper Type", value: "Öhlins TTX25 4-Way" }
    ],
    teamLead: "David Kalu & Tanya Becker",
    highlights: [
      "Finite Element topology optimization reduced upright mass by 230g each",
      "Adjustable anti-squat and anti-dive pick-up points on the subframe"
    ]
  },
  {
    id: "proj-06",
    number: "06",
    title: "EcoCombust Variable Intake & Fuel Rig",
    category: "Research",
    year: "2024",
    status: "Completed",
    featured: false,
    tagline: "Dynamometer test rig investigating variable intake runner lengths and biofuels on single-cylinder engines.",
    description: "An academic research testbench engineered inside the Mechanical Engineering lab. Includes computerized throttle actuation, optical encoder crank angle tracking, and high-frequency piezoelectric in-cylinder pressure sensors.",
    heroImage: "/images/projects/project-06.jpg",
    gallery: [
      "/images/projects/project-06-a.jpg"
    ],
    technologies: ["LabVIEW", "Piezoelectric DAQ", "Dyno Tuning", "Combustion Thermodynamics", "Matlab"],
    specs: [
      { label: "Test Engine", value: "KTM 390 Single-Cylinder" },
      { label: "Runner Length Range", value: "120 mm – 280 mm continuous" },
      { label: "Sampling Rate", value: "100 kHz Crank-Angle Synced" },
      { label: "Volumetric Eff. Gain", value: "+8.4% at 7,500 RPM" }
    ],
    teamLead: "Elena Rostova & Faculty Advisor",
    highlights: [
      "Published departmental findings in Student Automotive Engineering Journal",
      "Demonstrated 11% brake-specific fuel consumption improvement"
    ]
  },
  {
    id: "proj-07",
    number: "07",
    title: "Apex-Kart Electric Sprint Racer",
    category: "EV",
    year: "2024",
    status: "Completed",
    featured: false,
    tagline: "Sprint electric kart engineered as a training platform for incoming junior engineering members.",
    description: "A rapid prototyping vehicle created to teach first and second year engineering students fundamentals of chassis tubing bending, sprocket ratios, hydraulic disc caliper bleeding, and electrical safety.",
    heroImage: "/images/projects/project-07.jpg",
    gallery: [
      "/images/projects/project-07-a.jpg"
    ],
    technologies: ["Chrome-Moly Tubing", "BLDC Motor Controller", "Hydraulic Brakes", "Telemetry Display"],
    specs: [
      { label: "Drive Motor", value: "15 kW Brushless DC" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Weight", value: "98 kg" },
      { label: "Battery Pack", value: "48V 40Ah Lithium NMC" }
    ],
    teamLead: "Sarah Chen & Liam O'Connor",
    highlights: [
      "Built in 8 weeks as an orientation project for fresh student cohorts",
      "Finished 2nd overall in Inter-University Student Kart Sprint"
    ]
  }
];

export const projectCategories = [
  "All",
  "Motorsports",
  "EV",
  "Vehicle Design",
  "Fabrication",
  "Robotics",
  "Research"
];
