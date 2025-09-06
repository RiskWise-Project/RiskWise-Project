import React from "react";

function RiskCardList({ report }) {
  return (
    <div className="report-card w-full bg-white md:flex-row shadow-md rounded-lg p-4 flex flex-col gap-5 border border-gray-200">
      <div className="image-container w-full md:w-[30vw] h-48 md:h-60 overflow-hidden rounded-md">
        <img
          src={report.fileBase64}
          alt="Report Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-container w-full text-justify md:w-[70vw] flex flex-col gap-1.5">
        <div className="text-headers flex flex-col gap-1 mb-2.5">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span>{" "}
            {report.category || "Unknown"}
          </p>
          <h2 className="text-lg font-bold text-gray-800 leading-4.5">
            {report.description || "No description"}
          </h2>
          <p className="text-xs text-gray-400">
            Created at: {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="text-container-details h-full flex flex-col justify-between gap-10 md:gap-0">
          <div className="sub-text-container">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Address:</span>{" "}
              {report.address || "Not provided"}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">Summary:</span>{" "}
              {report.summary || "No Summary"}
            </p>
          </div>

          <div className="severity-container flex flex-row justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Severity:</span>{" "}
              {report.severity || "Medium"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Risk Score:</span>{" "}
              {report.score || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskCardList;
