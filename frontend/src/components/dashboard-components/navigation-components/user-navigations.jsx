import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userNavData } from "../../../data/dashboard-data/user-nav";

import { riskwise_symbol } from "../../../assets/logos/logo";
import riskwise_combination from "../../../assets/logos/riskwise-logo-2x.webp";

function UserNavigation() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`
    bg-[var(--color-white)]
    shadow-[0_6px_20px_rgba(0,0,0,0.15)]
    transition-all duration-300 ease-in-out

    md:static md:h-screen md:flex md:flex-col md:justify-start
    md:rounded-tr-4xl md:rounded-br-4xl
    md:w-fit
    
    ${expanded ? "md:px-10 " : "md:px-2 "}
    items-center justify-center
    flex
    flex-col
  `}
    >
      <div
        className={`image-container-logo md:block hidden absolute top-5  ${
          expanded ? "aspect-video h-10" : "aspect-square w-13 h-0"
        }cursor-pointer`}
      >
        <img
          src={expanded ? riskwise_combination : riskwise_symbol}
          alt="riskwise logo symbol"
          onClick={toggleExpanded}
        />
      </div>

      <div className="h-full md:w-fit w-full flex md:flex-col items-center md:items-center md:justify-center ">
        {userNavData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => navigate(item.location)}
              className="flex md:flex-col items-center z-55 md:justify-center justify-evenly w-full h-25 md:w-fit p-4 cursor-pointer transition-colors duration-300 ease-in-out"
            >
              <Icon className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] md:mb-0 mb-7" />
              <span
                className={`text-sm text-[var(--color-highlight)] md:block hidden opacity-0 whitespace-nowrap ${
                  expanded ? "md:opacity-100" : "md:hidden"
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserNavigation;
