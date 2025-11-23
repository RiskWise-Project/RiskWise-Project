import { Bell, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserReports } from "../../../services/image-services";
import { getAuth } from "firebase/auth";
import { riskwise_symbol } from "../../../assets/logos/logo";
import RiskCardGrid from "../../../components/dashboard-components/report-list-components/risk-card-grid";
import RiskCardList from "../../../components/dashboard-components/report-list-components/risk-card-list";
import { useUserNotifications } from "../../../context/user-notification-context";
import UserNotificationModal from "../../../components/notification-components/notification-modal/user-notification-modal";
import SortModal from "../../../components/admin-components/user-management-components/sort-modal";
import dayjs from "dayjs";

function ReportListPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    month: "",
    severity: "",
    category: "",
    status: "",
    date: "",
  });

  const { unreadCount, modalOpen, setModalOpen } = useUserNotifications();

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setReports([]);
        return;
      }

      setIsLoading(true);
      try {
        const tokenID = await user.getIdToken();
        const userReports = await fetchUserReports(user.uid, tokenID);

        // 🚨 Always convert createdAt safely
        const reportsWithDates = userReports.map((report) => ({
          ...report,
          createdAt: new Date(report.createdAt),
        }));

        const sorted = reportsWithDates.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setReports(sorted);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🧠 Apply filters safely
  const filteredReports = reports.filter((report) => {
    if (filters.month && report.createdAt.getMonth() !== Number(filters.month))
      return false;
    if (filters.severity && report.severity !== filters.severity) return false;
    if (filters.category && report.category !== filters.category) return false;
    if (filters.status && (report.status ?? "") !== filters.status)
      return false;

    return true;
  });

  // 📌 Sorting
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (filters.date === "dateAsc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (filters.date === "dateDesc")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  // 📌 Group by month text
  const groupedReports = sortedReports.reduce((groups, report) => {
    const monthKey = dayjs(report.createdAt).format("MMMM YYYY");
    if (!groups[monthKey]) groups[monthKey] = [];
    groups[monthKey].push(report);
    return groups;
  }, {});

  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)]">
      {/* Header */}
      <div className="header-container-dashboard flex flex-row items-center justify-between p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Report
        </h1>

        <div className="buttons flex flex-row items-center gap-4">
          <button
            onClick={() => setSortModalOpen(true)}
            className="p-2 rounded-lg text-[var(--color-highlight)] cursor-pointer"
          >
            <SlidersHorizontal
              className="md:w-6 md:h-6 w-5 h-5"
              strokeWidth={2.5}
            />
          </button>
          <button
            onClick={toggleViewMode}
            className="p-2 rounded-lg md:block hidden text-[var(--color-highlight)] cursor-pointer"
          >
            {viewMode === "grid" ? (
              <LayoutGrid className="md:w-7 md:h-7 w-6 h-6" strokeWidth={2.5} />
            ) : (
              <List className="md:w-7 md:h-7 w-6 h-6" strokeWidth={2.5} />
            )}
          </button>

          <div
            className="relative cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <Bell
              className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black"
              strokeWidth={2.5}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reports */}
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
        ) : sortedReports.length === 0 ? (
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
                    ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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

      <SortModal
        isOpen={sortModalOpen}
        onClose={() => setSortModalOpen(false)}
        sortOptions={filters}
        setSortOptions={setFilters}
      />
      <UserNotificationModal />
    </div>
  );
}

export default ReportListPage;
