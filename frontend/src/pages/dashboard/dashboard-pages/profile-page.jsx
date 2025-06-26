import { Bell } from "lucide-react";

import LeftSideProfile from "../../../components/dashboard-components/profile-components/left-side-profile";
import RightSideProfile from "../../../components/dashboard-components/profile-components/right-side-profile";

function ProfilePage() {
  return (
    <div className="dashboard-container flex flex-col w-full h-full  bg-[var(--color-white)]">
      <div className="header-container-dashboard flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          User Profile
        </h1>
        <Bell
          className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
          strokeWidth={2.5}
        />
      </div>
      <div className="content-container-profile grid grid-cols-1 h-[95%] md:grid-cols-2 gap-4 md:p-4">
        <div className="left-side-profile">
          <LeftSideProfile />
        </div>
        <div className="right-side-profile">
          <RightSideProfile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
