import { Bell } from "lucide-react";

function ReportListPage() {
  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)]">
      <div className="header-container-dashboard flex flex-row items-center justify-between p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Report
        </h1>
        <Bell
          className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
          strokeWidth={2.5}
        />
      </div>

      <div className="report-form md:p-4 w-full grid md:grid-cols-1 gap-5">
        List
      </div>
    </div>
  );
}

export default ReportListPage;
