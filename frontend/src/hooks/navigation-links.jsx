import { useTranslation } from "react-i18next";

export function useNavigationLinks() {
  const { t } = useTranslation();

  return [
    { title: t("HeaderComponentLP.about"), href: "#about" },
    { title: t("HeaderComponentLP.features"), href: "#feature" },
    { title: t("HeaderComponentLP.download"), href: "#download" },
    { title: t("HeaderComponentLP.contact"), href: "#contact" },
  ];
}
