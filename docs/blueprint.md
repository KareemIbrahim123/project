# **App Name**: AYMA

## Core Features:

- Autonomous Energy Monitor: Real-time gauge visualizing current battery level and PV input, calculating remaining hours to autonomy target, sourcing data from Firebase Firestore.
- Environmental Sensor Dashboard: Live charts displaying real-time data for environmental variables (Temperature, Gas, Motion, Sound, Distance) from ESP32 nodes via Firebase Firestore.
- Network Resilience Monitor: Display a connectivity map showing the status of Hybrid Link components (Cellular Booster, P2P Li-Fi, HF Emergency Link) and provide a failover trigger simulation.
- AI-powered Alert Validation: Generate 'Validated Alerts' by utilizing an AI-powered fusion algorithm tool to filter out false alarms by 95%.
- CapEx Financial Overview: Summary widget showing actual vs. target CapEx reduction and current spending per node (target: 6,000 EGP per node).
- Admin User Authentication: Secure user authentication and management for city administrators using Firebase Authentication.

## Style Guidelines:

- Overall dark-mode aesthetic with a 'Cyber-Industrial' feel. Primary interactive elements and data points utilize a vibrant electric violet-blue (#5233FF).
- The background will be a very dark, desaturated violet-grey (#17161C), providing depth while enhancing content visibility.
- Accent color will be a light sky blue/cyan (#80CCD9), analogous to the primary but lighter, used for highlights and secondary interactive elements.
- Critical alerts will be prominently displayed using a high-contrast red (#FF0000), with amber (#FFB800) for warnings or cautionary statuses.
- Headline and body font: 'Space Grotesk' (sans-serif) for a modern, techy, and industrial aesthetic suited for dashboards.
- Integrate 'Blender-style' 3D geospatial icons for the masterplan view and utilize sleek, minimalistic industrial icons for other data and status indicators.
- A highly modular dashboard layout designed for multi-panel data display, emphasizing clear organization of real-time gauges, charts, and status indicators in a 'Smart City Operating System' style.
- Subtle, fluid animations for real-time data updates, gauge transitions, and network status changes to convey a sense of continuous monitoring and responsiveness.