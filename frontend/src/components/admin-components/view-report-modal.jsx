import React from "react";

function ViewReportModal({ report, reporterName, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-2xl w-[90%] border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-[var(--color-dark)]">
            Report Details
          </h2>
        </div>

        {/* Image if available */}
        {report.fileBase64 && (
          <div className="mb-4">
            <img
              src={report.fileBase64}
              alt={report.caption || "Report Attachment"}
              className="rounded-lg shadow-md max-h-64 w-full object-cover object-center"
            />
          </div>
        )}

        {/* Report Info */}
        <div className="space-y-1 text-[var(--color-dark)]">
          <div className="flex justify-between items-center mb-5">
            <p className="font-semibold text-sm">
              <span>Category:</span> {report.category || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  report.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : report.status === "archived"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {report.status}
              </span>
            </p>
          </div>

          <p className="text-xs">
            <span className="font-semibold">Date Submitted:</span>{" "}
            {new Date(report.createdAt).toLocaleString()}
          </p>

          <div>
            <p>
              <span className="font-semibold ">Summary:</span> {report.summary}
            </p>
          </div>

          <p className="text-sm mb-5">
            <span className="font-semibold">Location:</span>{" "}
            {report.address || "N/A"}
          </p>
          <p className="text-sm mb-5">
            <span className="font-semibold">Reported By:</span>{" "}
            {reporterName || "Unknown"}
          </p>

          <div className="flex justify-between">
            <p>
              <span className="font-semibold">Risk Score:</span>{" "}
              <span className="font-bold">{report.score}</span>
            </p>
            <p>
              <span className="font-semibold">Severity:</span>{" "}
              <span
                className={`font-bold ${
                  report.severity === "High"
                    ? "text-red-500"
                    : report.severity === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {report.severity}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-600 text-[#ffffff] rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewReportModal;
