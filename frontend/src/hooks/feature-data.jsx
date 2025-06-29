import { useTranslation } from "react-i18next";
import { AlertCircle, BarChart2, Bell, Gauge, MapPin } from "lucide-react";

function useFeatureData() {
  const { t } = useTranslation();

  return [
    {
      title: t("FeaturesComponentLP.risk_reporting_title"),
      description: t("FeaturesComponentLP.risk_reporting_description"),
      icon: (
        <AlertCircle className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("FeaturesComponentLP.admin_dashboard_title"),
      description: t("FeaturesComponentLP.admin_dashboard_description"),
      icon: (
        <Gauge className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("FeaturesComponentLP.real_time_alerts_title"),
      description: t("FeaturesComponentLP.real_time_alerts_description"),
      icon: (
        <Bell className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("FeaturesComponentLP.incident_timeline_title"),
      description: t("FeaturesComponentLP.incident_timeline_description"),
      icon: (
        <BarChart2 className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
    {
      title: t("FeaturesComponentLP.geolocation_title"),
      description: t("FeaturesComponentLP.geolocation_description"),
      icon: (
        <MapPin className="md:w-9 md:h-9 w-7 h-7 text-[var(--color-white)]" />
      ),
    },
  ];
}

export default useFeatureData;
