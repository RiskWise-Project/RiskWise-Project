import { useEffect, useState } from "react";
import { navigationLinks } from "../../../data/navigation-links";
import { Link, useLocation } from "react-router-dom";
import "./footer-component.css";

function FooterComponent() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderLink = (link) => {
    const isActive = location.hash === link.href;

    if (link.href.startsWith("#")) {
      return (
        <a
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(link.href);
          }}
          className={`navigation-link font-semibold text-[18px] hover:text-[var(--color-highlight)] ${
            isActive ? "active" : ""
          }`}
        >
          {link.title}
        </a>
      );
    }

    return (
      <Link
        to={link.href}
        className={`navigation-link font-semibold text-[18px] hover:text-[var(--color-highlight)] ${
          isActive ? "active" : ""
        }`}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <div
      className={`fs-main-container py-5 ${
        installPromptEvent ? "bg-white" : " bg-[var(--color-dark)]"
      }`}
    >
      <div className="fs-contact-container flex flex-col gap-2">
        <div className="fs-nav-links-container">
          <ul
            className={`flex flex-row gap-5 justify-center${
              installPromptEvent ? "" : "text-[var(--color-white)]"
            }`}
          >
            {navigationLinks.map((link, index) => (
              <li key={index}>{renderLink(link)}</li>
            ))}
          </ul>
        </div>
        <div className="fs-contact-info-container">
          <div
            className={`fs-email-container flex flex-row items-center justify-center gap-1 ${
              installPromptEvent ? "" : "text-[var(--color-white)]"
            }`}
          >
            <p className="fs-email-label">Email: </p>
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
        className={`fs-copyright-container text-center mt-2 ${
          installPromptEvent ? "" : "text-[var(--color-white)]"
        }`}
      >
        <p>© {new Date().getFullYear()} RiskWise. All rights reserved.</p>
      </div>
    </div>
  );
}

export default FooterComponent;
