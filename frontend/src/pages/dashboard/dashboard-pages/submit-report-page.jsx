import { useState } from "react";
import { Bell } from "lucide-react";
import ReportFormContainer from "../../../components/dashboard-components/report-components/report-form-container";
import { dhvsuCoords } from "../../../services/report services/report-form-functions";
import PreviewContainer from "../../../components/dashboard-components/report-components/preview-container/preview-container";

function SubmitReportPage() {
  const [fileName, setFileName] = useState();
  const [location, setLocation] = useState(dhvsuCoords);
  const [address, setAddress] = useState("PamSU Bacolor, Pampanga");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

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
          />
        </div>
        <div className="mb-15">
          <PreviewContainer
            fileName={fileName}
            location={location}
            address={address}
            loading={loading}
            analysis={analysis}
          />
        </div>
      </div>
    </div>
  );
}

export default SubmitReportPage;
