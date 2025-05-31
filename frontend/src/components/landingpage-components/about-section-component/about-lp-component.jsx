import React from "react";
import "./about-lp-component.css";

function AboutSectionComponent() {
  return (
    <div className="about-main-container md:w-[90%] w-full m-auto px-5">
      <div className="flex flex-col items-center gap-6 md:my-[10%] my-[50%]">
        <h1 className="font-black md:text-4xl text-3xl tracking-wider">
          ABOUT
        </h1>
        <p className="text-center w-[50%] text-xl">
          RiskWise is a tool for uncovering and handling risks. It runs on any
          device with a browser. You can tap into it even without an internet
          connection. Users can flag hazards, trace risks, and absorb safety
          tips. It helps teams respond quickly and stay alert. RiskWise fosters
          safer spaces by making risk data easy to spread and grasp.
        </p>
        <a
          href=""
          className="text-xl mt-5 hover:text-[var(--color-highlight)] transition-colors duration-75 ease-in"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default AboutSectionComponent;
