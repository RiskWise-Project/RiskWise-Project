import { Bell } from "lucide-react";
import NotificationModal from "../../../components/notification-components/notification-modal/NotificationModal";
import { useNotifications } from "../../../context/NotificationContext";

export default function AdminDashboard() {
  const { unreadCount, setModalOpen } = useNotifications();

  return (
    <div className="dashboard-container flex flex-col w-full h-full bg-[var(--color-white)]">
      <div className="header-container-dashboard flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Admin Dashboard
        </h1>

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

      <NotificationModal />
    </div>
  );
}
