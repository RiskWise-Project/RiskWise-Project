import { useState } from "react";
import { Bell } from "lucide-react";
import ReportFormContainer from "../../../components/dashboard-components/report-components/report-form-container";
import { dhvsuCoords } from "../../../services/report services/report-form-functions";
import PreviewContainer from "../../../components/dashboard-components/report-components/preview-container/preview-container";
import { useUserNotifications } from "../../../context/user-notification-context";
import UserNotificationModal from "../../../components/notification-components/notification-modal/user-notification-modal";

function SubmitReportPage() {
  const [fileName, setFileName] = useState();
  const [fileNametoPass, setFileNametoPass] = useState();
  const [location, setLocation] = useState(dhvsuCoords);
  const [address, setAddress] = useState("PamSU Bacolor, Pampanga");
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [analysis, setAnalysis] = useState("");
  const { unreadCount, modalOpen, setModalOpen } = useUserNotifications();

  return (
    <div className="flex flex-col w-full h-full bg-[var(--color-white)]">
      <div className="header-container-dashboard flex flex-row items-center justify-between p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Report
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
      <div className="report-form md:p-4 w-full grid md:grid-cols-2 gap-5">
        <div className="mb-15">
          <ReportFormContainer
            fileName={fileName}
            setFileName={setFileName}
            location={location}
            setLocation={setLocation}
            address={address}
            setAddress={setAddress}
            loading={loading}
            setLoading={setLoading}
            analysis={analysis}
            setAnalysis={setAnalysis}
            setFileNametoPass={setFileNametoPass}
            fileNametoPass={fileNametoPass}
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        </div>
        <div className="mb-15">
          <PreviewContainer
            fileName={fileName}
            address={address}
            loading={loading}
            analysis={analysis}
            fileNametoPass={fileNametoPass}
            description={additionalInfo}
          />
        </div>
      </div>
      <UserNotificationModal />
    </div>
  );
}

export default SubmitReportPage;
