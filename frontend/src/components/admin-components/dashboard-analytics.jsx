import { useReports } from "../../hooks/use-reports";

function DashboardAnalytics() {
  const reports = useReports();

  const totalReports = reports.length;
  const highRiskIssues = reports.filter((r) => r.score >= 8).length;
  const resolvedIssues = reports.filter((r) => r.status === "resolved").length;
  const pendingReviews = reports.filter((r) => r.status === "pending").length;
  return (
    <div className="dashboard-analytics-container mt-5 w-full md:h-fit h-[30%] grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="analytics-card rounded-lg bg-[var(--color-card-bg)] p-5 text-[var(--color-white)] flex flex-col gap-1 font-bold">
        <h1 className="text-sm text-[var(--color-white)] tracking-wide">
          Total Risk Reports
        </h1>
        <p className="text-3xl font-black">{totalReports}</p>
      </div>
      <div className="analytics-card rounded-lg bg-[var(--color-card-bg)] p-5 text-[var(--color-white)] flex flex-col gap-1 font-bold">
        <h1 className="text-sm text-[var(--color-white)] tracking-wide">
          High Risk Issues
        </h1>
        <p className="text-3xl font-black">{highRiskIssues}</p>
      </div>
      <div className="analytics-card rounded-lg bg-[var(--color-card-bg)] p-5 text-[var(--color-white)] flex flex-col gap-1 font-bold">
        <h1 className="text-sm text-[var(--color-white)] tracking-wide">
          Resolve Issues
        </h1>
        <p className="text-3xl font-black">{resolvedIssues}</p>
      </div>
      <div className="analytics-card rounded-lg bg-[var(--color-card-bg)] p-5 text-[var(--color-white)] flex flex-col gap-1 font-bold">
        <h1 className="text-sm text-[var(--color-white)] tracking-wide">
          Pending Reviews
        </h1>
        <p className="text-3xl font-black">{pendingReviews}</p>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
