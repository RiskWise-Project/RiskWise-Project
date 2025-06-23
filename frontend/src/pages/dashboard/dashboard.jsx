import React from "react";
import UserNavigation from "../../components/dashboard-components/navigation-components/user-navigations";
import { Outlet } from "react-router-dom";

function dashboard() {
  return (
    <div className="dashboard-container flex flex-col md:flex-row h-screen w-full bg-[var(--color-white)]">
      <div className="navigation-container md:static fixed bottom-0 w-fit h-16 md:h-screen md:w-fit z-50">
        <UserNavigation />
      </div>

      <div className="content-container flex-1 p-4 overflow-auto md:h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default dashboard;
