import React from "react";

function AnalyticsTable({
  chartType,
  reportsPerMonthData,
  usersPerMonthData,
  severityDistributionData,
  categoryDistributionData,
  timeToResolutionData,
}) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name/Month</th>
            <th className="px-4 py-2 border">Value</th>
          </tr>
        </thead>
        <tbody>
          {chartType === "reportsPerMonth" &&
            reportsPerMonthData.map((r) => (
              <tr key={r.month}>
                <td className="px-4 py-2 border">{r.month}</td>
                <td className="px-4 py-2 border">{r.count}</td>
              </tr>
            ))}
          {chartType === "usersPerMonth" &&
            usersPerMonthData.map((u) => (
              <tr key={u.month}>
                <td className="px-4 py-2 border">{u.month}</td>
                <td className="px-4 py-2 border">{u.count}</td>
              </tr>
            ))}
          {chartType === "severityDistribution" &&
            severityDistributionData.map((s) => (
              <tr key={s.name}>
                <td className="px-4 py-2 border">{s.name}</td>
                <td className="px-4 py-2 border">{s.value}</td>
              </tr>
            ))}
          {chartType === "categoryDistribution" &&
            categoryDistributionData.map((c) => (
              <tr key={c.name}>
                <td className="px-4 py-2 border">{c.name}</td>
                <td className="px-4 py-2 border">{c.value}</td>
              </tr>
            ))}
          {chartType === "timeToResolution" &&
            timeToResolutionData.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-2 border">{t.id}</td>
                <td className="px-4 py-2 border">{t.days}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsTable;
