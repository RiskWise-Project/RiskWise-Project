import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import { useReports } from "../../hooks/use-reports";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SlidersHorizontal } from "lucide-react";
import ViewReportModal from "./view-report-modal";
import SortModal from "./user-management-components/sort-modal";
import { writeBatch } from "firebase/firestore"; // add this import at top

function AdminRecentReports() {
  const reports = useReports();
  const [reporterNames, setReporterNames] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [archiveAllModalOpen, setArchiveAllModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    month: "", // 0-11 or "" for all
    severity: "", // Low, Medium, High, Critical, or ""
    category: "", // Operational, Environmental, Safety, Security, Structural, Other, or ""
    status: "", // pending, solved, etc.
    date: "", // "dateAsc" or "dateDesc"
  });

  // Fetch reporter names
  useEffect(() => {
    const fetchReporterNames = async () => {
      const activeReports = reports.filter((r) => r.status !== "archived");
      const uniqueUserIds = [...new Set(activeReports.map((r) => r.userId))];
      const namesMap = {};

      await Promise.all(
        uniqueUserIds.map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) namesMap[uid] = userDoc.data().fullname;
          else namesMap[uid] = "Unknown";
        })
      );

      setReporterNames(namesMap);
    };

    if (reports.length > 0) fetchReporterNames();
  }, [reports]);

  const handleView = (report) => setSelectedReport(report);
  const handleCloseModal = () => setSelectedReport(null);
  const handleArchive = async (id) => {
    await updateDoc(doc(db, "reports", id), { status: "archived" });
  };

  // Apply filters
  const filteredReports = reports
    .filter((report) => report.status !== "archived")
    .filter((report) =>
      filters.month !== ""
        ? new Date(report.createdAt).getMonth() === Number(filters.month)
        : true
    )
    .filter((report) =>
      filters.severity ? report.severity === filters.severity : true
    )
    .filter((report) =>
      filters.category ? report.category === filters.category : true
    )
    .filter((report) =>
      filters.status ? report.status === filters.status : true
    );

  // Apply sorting
  const sortedReports = filteredReports.sort((a, b) => {
    if (filters.date) {
      return filters.date === "dateAsc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const handleArchiveAll = async () => {
    const batch = writeBatch(db);
    const nonArchivedReports = reports.filter((r) => r.status !== "archived");

    nonArchivedReports.forEach((report) => {
      const reportRef = doc(db, "reports", report.id);
      batch.update(reportRef, { status: "archived" });
    });

    try {
      await batch.commit();
      alert("All reports have been archived!");
    } catch (err) {
      console.error("Error archiving all reports:", err);
      alert("Failed to archive all reports. See console.");
    }
  };

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="header-container w-full flex justify-between">
        <h1 className="text-lg text-[var(--color-dark)] tracking-wider font-black md:text-xl">
          Recent Risk Reports
        </h1>
        <div>
          <button onClick={() => setSortModalOpen(true)} className="px-3 py-1 ">
            <SlidersHorizontal className="inline-block font-black mr-2 md:w-5 md:h-5 w-4 h-4" />
          </button>
          <button
            onClick={() => setArchiveAllModalOpen(true)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Archive All
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="risk-list overflow-auto md:max-h-[60vh] max-h-[45vh] pb-2 mt-4 space-y-4">
        {sortedReports.length === 0 ? (
          <p className="text-gray-500">No reports found.</p>
        ) : (
          sortedReports.map((report) => (
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
                        : report.severity === "Low"
                        ? "text-green-400"
                        : "text-purple-500"
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
                  <select
                    value={report.status || "Take Action"}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await updateDoc(doc(db, "reports", report.id), {
                          status: newStatus,
                          adminRead: false,
                        });
                      } catch (err) {
                        console.error("Error updating status:", err);
                      }
                    }}
                    className={`px-3 py-1 text-white rounded hover:opacity-90
                      ${report.status === "pending" ? "bg-yellow-500" : ""}
                      ${report.status === "solved" ? "bg-green-600" : ""}
                      ${
                        !report.status || report.status === "Take Action"
                          ? "bg-gray-500"
                          : ""
                      }
                    `}
                  >
                    <option value="Take Action" disabled>
                      Take Action
                    </option>
                    <option value="pending">Pending</option>
                    <option value="solved">Solved</option>
                  </select>
                  <button
                    onClick={() => handleView(report)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleArchive(report.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

      {archiveAllModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800">Confirm Archive</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to archive all reports? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setArchiveAllModalOpen(false)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setArchiveAllModalOpen(false);
                  await handleArchiveAll();
                }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Filter / Sort Modal */}
      <SortModal
        isOpen={sortModalOpen}
        onClose={() => setSortModalOpen(false)}
        sortOptions={filters}
        setSortOptions={setFilters}
      />
    </div>
  );
}

export default AdminRecentReports;
