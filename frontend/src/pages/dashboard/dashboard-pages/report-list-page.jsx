import { Bell, LayoutGrid, List } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserReports } from "../../../services/image-services";
import { getAuth } from "firebase/auth";
import { riskwise_symbol } from "../../../assets/logos/logo";
import RiskCardGrid from "../../../components/dashboard-components/report-list-components/risk-card-grid";
import RiskCardList from "../../../components/dashboard-components/report-list-components/risk-card-list";
import dayjs from "dayjs";

function ReportListPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const tokenID = await user.getIdToken();
          const userReports = await fetchUserReports(user.uid, tokenID);

          const sorted = [...userReports].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setReports(sorted);
        } else {
          console.warn("No authenticated user found.");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const groupedReports = reports.reduce((groups, report) => {
    const month = dayjs(report.createdAt).format("MMMM YYYY");
    if (!groups[month]) groups[month] = [];
    groups[month].push(report);
    return groups;
  }, {});

  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)]">
      <div className="header-container-dashboard flex flex-row items-center justify-between p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Report
        </h1>
        <div className="buttons flex flex-row items-center gap-4">
          <button
            onClick={toggleViewMode}
            className={`p-2 rounded-lg md:block hidden text-[var(--color-highlight)] cursor-pointer
            `}
          >
            {viewMode === "grid" ? (
              <LayoutGrid className="md:w-7 md:h-7 w-6 h-6" strokeWidth={2.5} />
            ) : (
              <List className="md:w-7 md:h-7 w-6 h-6" strokeWidth={2.5} />
            )}
          </button>

          <Bell
            className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
            strokeWidth={2.5}
          />
        </div>
      </div>

      <div className="report-form md:p-4 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
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
        ) : reports.length === 0 ? (
          <div>No reports found.</div>
        ) : (
          Object.keys(groupedReports).map((month) => (
            <div key={month} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--color-highlight)] border-b pb-2 mb-4">
                {month}
              </h2>

              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all ease-in-out duration-200"
                    : "flex flex-col gap-5"
                }
              >
                {groupedReports[month].map((report) =>
                  viewMode === "grid" ? (
                    <RiskCardGrid key={report.id} report={report} />
                  ) : (
                    <RiskCardList key={report.id} report={report} />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReportListPage;
