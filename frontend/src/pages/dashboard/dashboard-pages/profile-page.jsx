import { Bell } from "lucide-react";
import { useEffect } from "react";

import UserNotificationModal from "../../../components/notification-components/notification-modal/user-notification-modal";
import LeftSideProfile from "../../../components/dashboard-components/profile-components/left-side-profile";
import RightSideProfile from "../../../components/dashboard-components/profile-components/right-side-profile";
import { useUserNotifications } from "../../../context/user-notification-context";

function ProfilePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Get from context instead of local state
  const { unreadCount, modalOpen, setModalOpen } = useUserNotifications();

  return (
    <div className="dashboard-container flex flex-col w-full h-full bg-[var(--color-white)]">
      {/* Header */}
      <div className="header-container-dashboard flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Profile
        </h1>

        {/* Notification Bell */}
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

      {/* Content */}
      <div className="content-container-profile grid grid-cols-1 h-[95%] w-full md:grid-cols-2 gap-4 md:p-4">
        <div className="left-side-profile">
          <LeftSideProfile />
        </div>
        <div className="right-side-profile w-full">
          <RightSideProfile />
        </div>
      </div>

      {/* ✅ Pass modalOpen and setModalOpen again */}
      <UserNotificationModal />
    </div>
  );
}

export default ProfilePage;
