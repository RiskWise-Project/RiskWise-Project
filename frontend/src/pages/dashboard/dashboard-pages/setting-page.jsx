import { Bell } from "lucide-react";
import ProfileSettingSection from "../../../components/dashboard-components/settings-components/profile-setting";
import SecuritySetting from "../../../components/dashboard-components/settings-components/security-setting";
import { useEffect } from "react";
import PreferencesSetting from "../../../components/dashboard-components/settings-components/preferences-settings";

function SettingPages() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col w-full bg-[var(--color-white)] gap-10">
      <div className="flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Settings
        </h1>
        <Bell
          className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
          strokeWidth={2.5}
        />
      </div>

      <div className="w-full md:w-[80%] h-screen overflow-auto md:mx-auto mb-15 flex flex-col gap-6 md:gap-5 [&::-webkit-scrollbar]:hidden scrollbar-hide">
        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-6 shadow-sm">
          <ProfileSettingSection />
        </div>

        <div className="w-full h-[1px] bg-gray-300"></div>

        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-6 shadow-sm">
          <SecuritySetting />
        </div>

        <div className="w-full h-[1px] bg-gray-300"></div>

        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-6 shadow-sm">
          <PreferencesSetting />
        </div>
      </div>
    </div>
  );
}

export default SettingPages;
