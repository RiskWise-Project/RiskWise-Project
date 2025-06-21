import "./header-lp-component.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navigationLinks } from "../../../data/navigation-links";
import logo1x from "../../../assets/logos/riskwise-logo-1x.webp";
import logo2x from "../../../assets/logos/riskwise-logo-2x.webp";

function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
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
        onClick={() => setIsMenuOpen(false)}
        className={`navigation-link font-semibold text-[18px] hover:text-[var(--color-highlight)] ${
          isActive ? "active" : ""
        }`}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <div className="header-main-container">
      <div className="header-not-authenticated flex flex-row md:w-[90%] w-full m-auto py-2 justify-between items-center">
        <div className="left-side-header-container">
          <div className="img-container">
            <img
              src={logo1x}
              srcSet={`${logo1x} 1x, ${logo2x} 2x`}
              alt="RiskWise Logo"
              width="192"
              height="71"
              loading="eager"
              fetchPriority="high"
              onClick={() => navigate("/")}
              className="header-logo w-[12rem] h-auto cursor-pointer md:w-[10rem] sm:w-[8rem]"
            />
          </div>
        </div>

        <div className="right-side-header-container">
          <div className="navigation-container">
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 mr-5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </button>

            {isMenuOpen && (
              <ul className="md:hidden flex absolute flex-col items-center bg-[var(--color-white)] gap-4 mt-0 rounded-md right-5 w-fit p-5 shadow-lg z-50">
                {navigationLinks.map((link, index) => (
                  <li key={index}>{renderLink(link)}</li>
                ))}
              </ul>
            )}

            <ul className="navigation-links hidden md:flex justify-end gap-9.5">
              {navigationLinks.map((link, index) => (
                <li key={index}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
