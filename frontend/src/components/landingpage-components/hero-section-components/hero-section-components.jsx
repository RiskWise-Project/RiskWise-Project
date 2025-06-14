import React from "react";
import "./hero-section-components.css";
import heroBg from "../../../assets/resources/hero_section_bg.webp";

function HeroSectionComponent() {
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
            Real-Time Risk Assessment and Incident Reporting
          </span>
        </h1>

        <p className="text-[16px] md:text-xl mt-3 md:w-[50%] w-[100%] text-justify">
          Stay informed and in control with a simple, accessible tool for
          managing risks as they happen. Easily report hazards, follow updates,
          and get helpful guidance, all from your phone or computer, even when
          you're offline.
        </p>

        <button className="md:mt-[5rem] mt-[3rem] bg-[var(--color-highlight)] md:px-9 px-6 md:py-2 py-1.5 rounded-md text-[var(--color-white)] md:text-lg text-[17px] hover:cursor-pointer get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSectionComponent;
