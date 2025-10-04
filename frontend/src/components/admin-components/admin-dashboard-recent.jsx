import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import { useReports } from "../../hooks/use-reports";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ViewReportModal from "./view-report-modal";

function AdminRecentReports() {
  const reports = useReports();
  const [reporterNames, setReporterNames] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReporterNames = async () => {
      const uniqueUserIds = [...new Set(reports.map((r) => r.userId))];
      const namesMap = {};

      await Promise.all(
        uniqueUserIds.map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            namesMap[uid] = userDoc.data().fullname;
          } else {
            namesMap[uid] = "Unknown";
          }
        })
      );

      setReporterNames(namesMap);
    };

    if (reports.length > 0) fetchReporterNames();
  }, [reports]);

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleArchive = async (id) => {
    await updateDoc(doc(db, "reports", id), { status: "archived" });
  };

  const handleTakeAction = (report) => {
    console.log("Take action on report", report);
  };

  return (
    <div className="mt-10">
      <div className="header-container w-full">
        <h1 className="text-lg text-[var(--color-dark)] tracking-wider font-black md:text-xl">
          Recent Risk Reports
        </h1>
      </div>

      <div className="risk-list overflow-auto md:max-h-[60vh] max-h-[45vh] pb-2 mt-4 space-y-4">
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports found.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="report-card bg-[var(--color-card-bg)] p-4 rounded-lg flex flex-col gap-2"
            >
              <div className="report-info flex flex-col gap-5">
                <p className="text-sm">
                  <span className="font-semibold">Severity:</span>{" "}
                  <span
                    className={`font-bold ${
                      report.severity === "High"
                        ? "text-red-500"
                        : report.severity === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {report.severity}
                  </span>
                </p>

                <div className="flex flex-col gap-1.5">
                  <h2 className="font-bold text-base md:text-lg">
                    {report.summary}
                  </h2>
                  <p className="text-xs">
                    <span className="font-semibold">Date Submitted:</span>{" "}
                    {new Date(report.createdAt).toLocaleString()}
                  </p>

                  <div className="flex md:flex-row-reverse flex-col md:justify-between">
                    <p className="text-sm">
                      <span className="font-semibold">Reported by:</span>{" "}
                      {reporterNames[report.userId] || "Unknown"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {report.address}
                    </p>
                  </div>
                </div>

                <div className="report-actions flex gap-5 mt-2 md:mt-0 text-sm">
                  <button
                    onClick={() => handleTakeAction(report)}
                    className="px-3 py-1 bg-green-600 text-[#ffffff] rounded hover:bg-green-700"
                  >
                    Take Action
                  </button>
                  <button
                    onClick={() => handleView(report)}
                    className="px-3 py-1 bg-blue-600 text-[#ffffff] rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleArchive(report.id)}
                    className="px-3 py-1 bg-red-600 text-[#ffffff] rounded hover:bg-red-700"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedReport && (
        <ViewReportModal
          report={selectedReport}
          reporterName={reporterNames[selectedReport.userId]}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default AdminRecentReports;
