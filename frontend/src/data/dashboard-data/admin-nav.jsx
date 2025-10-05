import {
  LayoutDashboard,
  ChartArea,
  CircleUserRound,
  FileArchive,
} from "lucide-react";

export const adminNav = [
  {
    RouteTitle: "Dashboard",
    RouteLocation: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    RouteTitle: "Analytics",
    RouteLocation: "/admin/analytics",
    icon: ChartArea,
  },
  {
    RouteTitle: "User Management",
    RouteLocation: "/admin/user-management",
    icon: CircleUserRound,
  },
  {
    RouteTitle: "Archive",
    RouteLocation: "/admin/archived",
    icon: FileArchive,
  },
];
