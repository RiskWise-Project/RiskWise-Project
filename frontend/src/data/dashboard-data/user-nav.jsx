import { Aperture, LayoutList, Bolt, CircleUserRound } from "lucide-react";

export const userNavData = [
  {
    title: "Report",
    icon: Aperture,
    location: "/dashboard/report-risk",
  },
  {
    title: "Risks",
    icon: LayoutList,
    location: "/dashboard/risk-list",
  },
  {
    title: "Settings",
    icon: Bolt,
    location: "/dashboard/settings",
  },
  {
    title: "Profile",
    icon: CircleUserRound,
    location: "/dashboard/profile",
  },
];
