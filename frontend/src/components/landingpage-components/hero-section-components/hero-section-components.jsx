import React from "react";
import "./hero-section-components.css";
import heroBg from "../../../assets/resources/hero_section_bg.png";

function HeroSectionComponent() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="header-text-container items-center md:items-start flex flex-col md:pt-[12%] pt-[70%] md:pl-[15%] pl-[1%] h-fit">
        <h1 className="font-[var(--header-text)] font-black md:text-8xl text-5xl tracking-wide">
          RiskWise
        </h1>

        <p className="text-[17px] md:text-3xl md:w-[50%] w-[70%] text-center md:text-start">
          A Progressive Web App for Real-Time Risk Assessment and Incident
          Reporting.
        </p>

        <button className="md:mt-[5rem] mt-[3rem] bg-[var(--color-highlight)] md:px-9 px-4 md:py-2 py-1 rounded-md text-[var(--color-white)] md:text-lg text-large hover:cursor-pointer get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSectionComponent;
