import React from "react";

function KpiCards({ reports, users }) {
  const totalUsers = users.length;
  const totalReports = reports.length;
  const highRiskReports = reports.filter((r) => r.severity === "High").length;
  const resolvedReports = reports.filter(
    (r) => r.status?.toLowerCase() === "solved"
  ).length;

  const kpis = [
    { title: "Total Users", value: totalUsers, color: "bg-blue-600" },
    { title: "Total Reports", value: totalReports, color: "bg-red-600" },
    {
      title: "High-Risk Reports",
      value: highRiskReports,
      color: "bg-yellow-500",
    },
    {
      title: "Resolved Reports",
      value: resolvedReports,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className={`p-4 text-white rounded-lg font-bold ${kpi.color}`}
        >
          {kpi.title}: {kpi.value}
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
