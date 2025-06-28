import { useState } from "react";
import { useTranslation } from "react-i18next";

function RightSideProfile() {
  const [reports, setReports] = useState([]);
  const { t } = useTranslation();

  return (
    <div className="right-side-profile-container flex flex-col gap-4 items-center w-full mb-16.5 p-4">
      <h3 className="md:text-2xl text-xl font-black tracking-wider w-full text-[var(--color-highlight)]">
        {t("ProfilePage.recent_reports")}
      </h3>
      <div className="reports-container md:h-[90%] h-[100%] w-full">
        {reports.length != 0 ? (
          <h1>Report Presents</h1>
        ) : (
          <div
            className="no-reports-container rounded-md p-5 text-center bg-[var(--color-white)]
            shadow-[0_6px_20px_rgba(0,0,0,0.15)] w-full h-fit"
          >
            <p className="text-gray-500 opacity-75">
              {t("ProfilePage.no_reports_present")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideProfile;
