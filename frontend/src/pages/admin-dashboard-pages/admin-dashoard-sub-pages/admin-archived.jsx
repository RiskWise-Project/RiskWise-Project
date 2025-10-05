import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Bell, Sun, Moon, FileText, Users } from "lucide-react";

import NotificationModal from "../../../components/notification-components/notification-modal/notification-modal";
import { useNotifications } from "../../../context/notification-context";
import { useTheme } from "../../../context/theme-context";

export default function AdminArchived() {
  const [archivedReports, setArchivedReports] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const { unreadCount, setModalOpen } = useNotifications();
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const fetchArchivedReports = async () => {
      const q = query(
        collection(db, "reports"),
        where("status", "==", "archived")
      );
      const snapshot = await getDocs(q);
      setArchivedReports(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    const fetchArchivedUsers = async () => {
      const q = query(collection(db, "users"), where("archived", "==", true));
      const snapshot = await getDocs(q);
      setArchivedUsers(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchArchivedReports();
    fetchArchivedUsers();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)] md:mb-0 mb-40 transition-all">
      {/* Header */}
      <div className="flex flex-row items-center justify-between md:p-6 p-4 border-b border-gray-200">
        <h1 className="text-3xl font-black text-[var(--color-highlight)] tracking-wide">
          Archived Items
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:scale-105 transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="w-7 h-7 text-[var(--color-accent)]" />
            ) : (
              <Moon className="w-7 h-7 text-[var(--color-highlight)]" />
            )}
          </button>

          <div
            className="relative cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <Bell
              className="w-7 h-7 text-[var(--color-highlight)]"
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

      {/* Archived Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Archived Reports */}
        <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-card-bg)] p-6 text-[var(--color-white)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="w-7 h-7 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">
              Archived Reports
            </h2>
          </div>

          {archivedReports.length > 0 ? (
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[var(--color-accent)] scrollbar-track-white/10">
              {archivedReports.map((report) => (
                <li
                  key={report.id}
                  className="bg-white/10 hover:bg-white/20 transition-all duration-200 p-4 rounded-lg backdrop-blur-md"
                >
                  <p className="font-semibold">
                    {report.description || "Untitled Report"}
                  </p>
                  <p className="text-xs opacity-80 mt-1">
                    {report.summary?.slice(0, 100) ||
                      "No description available."}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-90 text-sm italic">
              No archived reports found.
            </p>
          )}
        </div>

        <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[var(--color-dark)] to-[var(--color-highlight)] p-6 text-[var(--color-white)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-white/20 rounded-lg">
              <Users className="w-7 h-7 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">Archived Users</h2>
          </div>

          {archivedUsers.length > 0 ? (
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[var(--color-accent)] scrollbar-track-white/10">
              {archivedUsers.map((user) => (
                <li
                  key={user.id}
                  className="bg-white/10 hover:bg-white/20 transition-all duration-200 p-4 rounded-lg backdrop-blur-md"
                >
                  <p className="font-semibold">
                    {user.fullname || "Unnamed User"}
                  </p>
                  <p className="text-xs opacity-80 mt-1">{user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-90 text-sm italic">
              No archived users found.
            </p>
          )}
        </div>
      </div>

      <NotificationModal />
    </div>
  );
}
