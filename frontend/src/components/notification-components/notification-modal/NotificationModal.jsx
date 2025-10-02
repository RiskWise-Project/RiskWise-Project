import { X } from "lucide-react";
import { useNotifications } from "../../../context/NotificationContext";

export default function NotificationModal() {
  const { notifications, modalOpen, setModalOpen, markAsRead, markAllAsRead } =
    useNotifications();

  if (!modalOpen) return null;

  return (
    <div className="absolute md:right-8 right-5 w-full max-w-md pl-15 items-start md:pt-20 pt-10 z-50">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-[var(--color-highlight)]">
            Notifications
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

        <div className="overflow-y-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-lg border flex flex-col gap-1 border-gray-200 cursor-pointer ${
                  !n.read ? "bg-gray-100" : "bg-[var(--color-white)]"
                }`}
                onClick={() => markAsRead(n.id)}
              >
                <p className="text-[var(--color-highlight)] font-black text-xs">
                  {n.category}
                </p>
                <h3 className="font-semibold text-sm text-gray-800">
                  {n.description}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-xs">{n.severity}</p>
                  <p className="text-gray-600 text-xs">{n.status}</p>
                </div>
                <span className="text-[10px] text-gray-400">
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No new reports</p>
          )}
        </div>
      </div>
    </div>
  );
}
