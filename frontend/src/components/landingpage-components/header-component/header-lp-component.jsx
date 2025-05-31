import "./header-lp-component.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { riskwise_combination } from "../../../assets/logos/logo";
import { navigationLinks } from "../../../data/navigation-links";

function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLocation = location.hash;

  return (
    <div className="header-main-container">
      <div className="header-not-authenticated flex flex-row md:w-[90%] w-full m-auto py-2 justify-between items-center">
        <div className="left-side-header-container">
          <div className="img-container">
            <img
              className="header-logo aspect-auto w-[12rem]"
              src={riskwise_combination}
              alt="Risk Wise Logo"
              onClick={() => navigate("/")}
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
              <span className="block w-6 h-0.5 bg-gray-800 mb-1 transition-transform duration-300"></span>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1 transition-transform duration-300"></span>
              <span className="block w-6 h-0.5 bg-gray-800 transition-transform duration-300"></span>
            </button>

            {isMenuOpen && (
              <ul className="md:hidden flex absolute flex-col items-center bg-[var(--color-white)] gap-4 mt-0 rounded-md right-5 w-fit p-5 shadow-lg">
                {navigationLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`navigation-link font-semibold text-[18px] hover:text-[var(--color-highlight)] ${
                      currentLocation === link.href ? "active" : ""
                    }`}
                  >
                    <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <ul className="navigation-links hidden md:flex justify-end gap-9.5">
              {navigationLinks.map((link, index) => (
                <li
                  className={`navigation-link font-semibold text-[18px] hover:text-[var(--color-highlight)] ${
                    currentLocation === link.href ? "active" : ""
                  }`}
                  key={index}
                >
                  <Link to={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
