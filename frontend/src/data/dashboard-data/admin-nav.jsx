import {
  LayoutDashboard,
  ChartArea,
  CircleUserRound,
  FileArchive,
} from "lucide-react";

export const adminNav = [
  {
    RouteTitle: "Dashboard",
    RouteLocation: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    RouteTitle: "Analytics",
    RouteLocation: "/dashboard/analytics",
    icon: ChartArea,
  },
  {
    RouteTitle: "User Management",
    RouteLocation: "/dashboard/user-management",
    icon: CircleUserRound,
  },
  {
    RouteTitle: "Archive",
    RouteLocation: "/dashboard/archive",
    icon: FileArchive,
  },
];
