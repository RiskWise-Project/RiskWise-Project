import { X } from "lucide-react";
import { useUserNotifications } from "../../../context/user-notification-context";

export default function UserNotificationModal() {
  const { notifications, modalOpen, setModalOpen, markAsRead, markAllAsRead } =
    useUserNotifications();

  if (!modalOpen) return null;

  return (
    <div className="absolute md:right-8 right-5 w-full max-w-md pl-15 items-start md:pt-20 pt-10 z-50">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-[var(--color-highlight)]">
            Report Updates
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-gray-500 hover:underline"
            >
              Mark all read
            </button>
            <X
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500"
              onClick={() => setModalOpen(false)}
            />
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-lg border flex flex-col gap-1 border-gray-200 cursor-pointer ${
                  !n.adminRead ? "bg-gray-100" : "bg-[var(--color-white)]"
                }`}
                onClick={() => markAsRead(n.id)}
              >
                <p className="text-[var(--color-highlight)] font-semibold text-sm">
                  {n.status === "archived"
                    ? "Your report was archived"
                    : n.status === "solved"
                    ? "Your report has been resolved"
                    : !n.adminRead
                    ? "Admin has not read your concern yet"
                    : "Admin has read your concern"}
                </p>
                <p className="text-xs text-gray-700">
                  {n.description?.slice(0, 80) || "No description available."}
                </p>
                <span className="text-[10px] text-gray-400">
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No report updates yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
