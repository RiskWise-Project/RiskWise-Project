import "./footer-component.css";
import { useTranslation } from "react-i18next";

function AboutFooterComponent() {
  const { t } = useTranslation();
  return (
    <div className={`fs-main-container py-5 bg-[var(--color-dark)]`}>
      <div className="fs-contact-container flex flex-col gap-2">
        <div className="fs-contact-info-container">
          <div
            className={`fs-email-container text-[var(--color-white)] flex flex-row items-center justify-center gap-1 `}
          >
            <a
              className="fs-email-link"
              href="mailto:riskwise.project@gmail.com"
            >
              riskwise.project@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div
        className={`fs-copyright-container text-center mt-2 text-[var(--color-white)]`}
      >
        <p>{t("FooterLP.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </div>
  );
}

export default AboutFooterComponent;
