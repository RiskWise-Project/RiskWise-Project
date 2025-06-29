import React from "react";
import "./hero-section-components.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroBg from "../../../assets/resources/hero_section_bg.webp";

function HeroSectionComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="header-text-container md:items-start flex flex-col md:pt-[12%] pt-[50%] md:pl-[15%] px-[5%] h-fit">
        <h1 className="font-black md:text-5xl text-4xl tracking-wider leading-snug md:w-[60%] w-full">
          RiskWise:{" "}
          <span className="text-[var(--color-highlight)]">
            {" "}
            {t("HeroComponentLP.headline")}
          </span>
        </h1>

        <p className="text-[16px] md:text-xl mt-3 md:w-[50%] w-[100%] text-justify">
          {t("HeroComponentLP.description")}
        </p>

        <button
          title="Login and Signup"
          onClick={() => navigate("/sign-in")}
          className="md:mt-[5rem] mt-[3rem] bg-[var(--color-highlight)] md:px-9 px-6 md:py-2 py-1.5 rounded-md text-[var(--color-white)] md:text-lg text-[17px] hover:cursor-pointer get-started-btn"
        >
          {t("HeroComponentLP.get_started")}
        </button>
      </div>
    </div>
  );
}

export default HeroSectionComponent;
