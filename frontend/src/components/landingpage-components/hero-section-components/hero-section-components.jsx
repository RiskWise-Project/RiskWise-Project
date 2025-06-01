import React from "react";
import "./hero-section-components.css";
import heroBg from "../../../assets/resources/hero_section_bg.png";

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
            Real-Time Risk Assessment and Incident
          </span>
        </h1>

        <p className="text-[16px] md:text-xl mt-3 md:w-[50%] w-[100%] text-justify">
          RISKWISE is a PWA designed to help organizations or communities
          identify, assess, and manage risks in real-time. The system allows
          users to report potential hazards, track ongoing risks, and receive
          guidance on mitigation strategies — all from their mobile or desktop
          browser, even offline.
        </p>

        <button className="md:mt-[5rem] mt-[3rem] bg-[var(--color-highlight)] md:px-9 px-6 md:py-2 py-1.5 rounded-md text-[var(--color-white)] md:text-lg text-[17px] hover:cursor-pointer get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSectionComponent;
