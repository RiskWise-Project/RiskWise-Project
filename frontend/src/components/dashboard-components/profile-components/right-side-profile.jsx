import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchUserReports } from "../../../services/image-services";
import { getAuth } from "firebase/auth";
import ReportCard from "./ReportCard";

function RightSideProfile() {
  const [reports, setReports] = useState([]);
  const { t } = useTranslation();

  const fetchReports = async (userId, token) => {
    const userReports = await fetchUserReports(userId, token);
    setReports(userReports);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      user.getIdToken().then((tokenID) => {
        fetchReports(user.uid, tokenID);
      });
    }
  }, []);

  return (
    <div className="right-side-profile-container flex flex-col gap-4 items-center w-full mb-16.5 md:mb-0 p-4">
      <h3 className="md:text-2xl text-xl font-black tracking-wider w-full text-[var(--color-highlight)]">
        {t("ProfilePage.recent_reports")}
      </h3>
      <div className="reports-container md:h-[80vh] h-[50vh] flex flex-col pb-2 gap-4 w-full overflow-y-scroll pr-2.5">
        {reports.length !== 0 ? (
          reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
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
