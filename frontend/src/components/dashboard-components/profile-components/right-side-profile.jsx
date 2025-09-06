import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchUserReports } from "../../../services/image-services";
import { getAuth } from "firebase/auth";
import { riskwise_symbol } from "../../../assets/logos/logo";
import ReportCard from "./ReportCard";

function RightSideProfile() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchReports = async (userId, token) => {
    setIsLoading(true);
    const userReports = await fetchUserReports(userId, token);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filteredReports = userReports.filter((report) => {
      const reportDate = new Date(report.createdAt);
      return (
        reportDate.getMonth() === currentMonth &&
        reportDate.getFullYear() === currentYear
      );
    });

    setReports(filteredReports);
    setIsLoading(false);
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-[var(--color-highlight)] border-t-transparent animate-spin"></div>
              <img
                src={riskwise_symbol}
                alt="RiskWise logo"
                className="w-8 h-8 absolute opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <p className="mt-4 text-[var(--color-highlight)] font-medium animate-pulse">
              Loading RiskWise...
            </p>
          </div>
        ) : reports.length !== 0 ? (
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
