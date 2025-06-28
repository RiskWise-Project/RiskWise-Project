import "./footer-component.css";

function AboutFooterComponent() {
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
        <p>© {new Date().getFullYear()} RiskWise. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AboutFooterComponent;
