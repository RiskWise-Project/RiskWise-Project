import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userNavData } from "../../../data/dashboard-data/user-nav";

import { riskwise_symbol } from "../../../assets/logos/logo";
import riskwise_combination from "../../../assets/logos/riskwise-logo-2x.webp";

function UserNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
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
        className={`image-container-logo md:block hidden absolute top-5 cursor-pointer ${
          expanded ? "aspect-video h-10" : "aspect-square w-13 h-0"
        }cursor-pointer`}
      >
        <img
          src={expanded ? riskwise_combination : riskwise_symbol}
          alt="riskwise logo symbol"
          onClick={toggleExpanded}
        />
      </div>

      <div className="h-full md:w-fit w-full flex md:flex-col gap-5 items-center md:items-center  md:justify-center ">
        {userNavData.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.location === location.pathname;

          return (
            <div
              key={index}
              onClick={() => navigate(item.location)}
              className={`flex flex-col items-center z-55 md:justify-center md:gap-3 rounded-xl justify-evenly w-full h-fit md:w-fit p-2.5 cursor-pointer ${
                isActive
                  ? " text-[var(--color-accent)]"
                  : "bg-[var(--color-white)] text-[var(--color-highlight)]"
              } transition-all duration-300 ease-in-out`}
            >
              <Icon
                strokeWidth={2}
                className="md:w-7 md:h-7 w-7 h-7  md:mb-0"
              />
              <span
                className={`text-sm whitespace-nowrap ${
                  expanded ? "opacity-100" : "opacity-100 md:hidden"
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {expanded && (
        <>
          <p className="text-[10px] text-center text-gray-500">
            © {new Date().getFullYear()} RiskWise.
          </p>
          <p className="text-[10px] text-center text-gray-500 mb-3">
            All rights reserved.
          </p>
        </>
      )}
    </div>
  );
}

export default UserNavigation;
