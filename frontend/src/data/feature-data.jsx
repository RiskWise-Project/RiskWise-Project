import { AlertCircle, BarChart2, Bell, Gauge, MapPin } from "lucide-react";

export const featureData = [
  {
    title: "Risk Reporting",
    description: "Report risks with photos, descriptions, and categories.",
    icon: (
      <AlertCircle className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
    ),
  },
  {
    title: "Admin Dashboard",
    description: "Manage and monitor reports with CRUD capabilities.",
    icon: <Gauge className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />,
  },
  {
    title: "Real-Time Alerts",
    description: "Receive push notifications for critical updates.",
    icon: <Bell className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />,
  },
  {
    title: "Incident Timeline View",
    description: "Visualize incidents over time for better storytelling.",
    icon: (
      <BarChart2 className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
    ),
  },
  {
    title: "Geolocation",
    description: "Capture and display location data for each report.",
    icon: (
      <MapPin className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
    ),
  },
];
