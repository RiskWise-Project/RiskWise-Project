import React from "react";
import { featureData } from "../../../data/feature-data";

function FeatureComponent() {
  return (
    <div className="feature-section-main-container bg-[var(--color-dark)] flex flex-col items-center py-15">
      <div className="feature-header-container md:w-[90%] w-full m-auto py-5">
        <h1 className="font-black md:text-4xl text-center text-3xl text-[var(--color-white)] tracking-wider">
          FEATURE
        </h1>
      </div>

      <div className="feature-item-container grid md:grid-cols-2 grid-cols-1 items-safe gap-y-10 md:gap-x-50">
        {featureData.map((feature, index) => (
          <div
            className={`feature-item-container flex flex-col items-center w-full gap-1 ${
              index === featureData.length - 1 ? "md:col-span-2" : ""
            }`}
            key={index}
          >
            {feature.icon}
            <h2 className=" text-[var(--color-white)] md:text-xl text-lg">
              {feature.title}
            </h2>
            <p
              className={`text-[var(--color-white)] text-center ${
                index === featureData.length - 1
                  ? "md:w-[35%] w-[80%]"
                  : "w-[80%]"
              }`}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureComponent;
