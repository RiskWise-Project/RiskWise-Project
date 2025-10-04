import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../utils/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { Bell, Sun, Moon } from "lucide-react";
import NotificationModal from "../../../components/notification-components/notification-modal/notification-modal";
import { useNotifications } from "../../../context/notification-context";
import { useTheme } from "../../../context/theme-context";
import KpiCards from "../../../components/admin-components/kpi-cards";
import ChartSelector from "../../../components/admin-components/chart-selector";
import PrintExportToolbar from "../../../components/admin-components/print-export-toolbar";

function AdminAnalytics() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [chartType, setChartType] = useState("reportsPerMonth");
  const { unreadCount, setModalOpen } = useNotifications();
  const { darkMode, setDarkMode } = useTheme();

  const analyticsRef = useRef(); // 👈 For printing/exporting

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setReports(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchReports();
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container flex flex-col w-full h-full bg-[var(--color-white)] md:mb-0 mb-40">
      <div className="header-container-dashboard flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Analytics
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-accent)] font-black" />
            ) : (
              <Moon className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black" />
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

      {/* Toolbar for print/export */}
      <PrintExportToolbar targetRef={analyticsRef} />

      {/* Wrap all analytics content in a ref */}
      <div ref={analyticsRef} className="export-clean">
        <KpiCards reports={reports} users={users} />
        <ChartSelector
          reports={reports}
          users={users}
          chartType={chartType}
          setChartType={setChartType}
        />
      </div>

      <NotificationModal />
    </div>
  );
}

export default AdminAnalytics;
