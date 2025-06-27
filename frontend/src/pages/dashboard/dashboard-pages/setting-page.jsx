import { Bell } from "lucide-react";

import ProfileSettingSection from "../../../components/dashboard-components/settings-components/profile-setting";

function SettingPages() {
  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)] gap-10">
      <div className=" flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Settings
        </h1>
        <Bell
          className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
          strokeWidth={2.5}
        />
      </div>
      <div className="w-full h-fit md:w-[80%] md:mx-auto flex flex-col gap-10">
        <ProfileSettingSection />
      </div>
    </div>
  );
}

export default SettingPages;
