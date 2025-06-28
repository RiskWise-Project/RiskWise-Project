import { useState } from "react";
import { useTranslation } from "react-i18next";
import enableDarkMode from "../../../utils/darkMode.setting";

function PreferencesSetting() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    enableDarkMode(newMode);
  };

  return (
    <div className="w-full h-fit flex flex-col gap-5 text-[var(--color-dark)]">
      <div className="section-header w-full flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wide">
          {t("PreferenceSetting.preference_setting")}
        </h1>
      </div>

      <div className="section-preference-container flex flex-col gap-10">
        <div className="preference-container flex flex-row items-center justify-between">
          <label htmlFor="darkMode" className="opacity-75 font-semibold">
            {t("PreferenceSetting.darkmode_setting")}
          </label>

          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              darkMode ? "bg-[var(--color-highlight)]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
        <div className="preference-container flex flex-row items-center justify-between">
          <label htmlFor="darkMode" className="opacity-75 font-semibold">
            {t("PreferenceSetting.language_setting")}
          </label>

          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="w-30 p-2 border border-gray-300 bg-[var(--color-white)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
          >
            <option className="text-[var(--color-dark)]" value="en">
              English
            </option>
            <option className="text-[var(--color-dark)]" value="ph">
              Filipino
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PreferencesSetting;
