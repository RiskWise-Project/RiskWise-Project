import { Globe, ShieldCheck, Accessibility, ListChecks } from "lucide-react";
import { useTranslation } from "react-i18next";

export const RiskWiseASA = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("RiskWiseASA.accessibility_title"),
      description: t("RiskWiseASA.accessibility_text"),
      icon: (
        <Globe className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("RiskWiseASA.safety_title"),
      description: t("RiskWiseASA.safety_text"),
      icon: (
        <ShieldCheck className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("RiskWiseASA.accountability_title"),
      description: t("RiskWiseASA.accountability_text"),
      icon: (
        <ListChecks className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
  ];
};
