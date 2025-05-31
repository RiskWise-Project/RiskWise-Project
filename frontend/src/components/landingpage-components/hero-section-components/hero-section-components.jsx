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
        <h1 className="font-black md:text-6xl text-5xl tracking-wider">
          RiskWise
        </h1>

        <p className="text-[16px] md:text-2xl mt-3 md:w-[50%] w-[70%] text-center md:text-start">
          A Progressive Web App for Real-Time Risk Assessment and Incident
          Reporting.
        </p>

        <button className="md:mt-[5rem] mt-[3rem] bg-[var(--color-highlight)] md:px-9 px-6 md:py-2 py-1.5 rounded-md text-[var(--color-white)] md:text-lg text-[17px] hover:cursor-pointer get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSectionComponent;
