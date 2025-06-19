import { Globe, ShieldCheck, Accessibility, ListChecks } from "lucide-react";

export const RiskWiseASA = [
  {
    title: "Accessibility",
    description: "Designed for all, even offline",
    icon: <Globe className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />,
  },
  {
    title: "Safety",
    description: "A commitment to proactive incident response",
    icon: (
      <ShieldCheck className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
    ),
  },
  {
    title: "Accountability",
    description: "Real-time visibility and transparency for better decisions",
    icon: (
      <ListChecks className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
    ),
  },
];
