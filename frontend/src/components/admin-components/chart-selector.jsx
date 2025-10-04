import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import AnalyticsTable from "./analytics-table";

const COLORS = ["#FF4C4C", "#FFC107", "#4CAF50", "#4B0082", "#00BFFF"];

function ChartSelector({ reports, users, chartType, setChartType }) {
  const reportsPerMonthData = Object.entries(
    reports.reduce((acc, r) => {
      const month = new Date(r.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([month, count]) => {
      const date = new Date(month);
      return { month, count, date };
    })
    .sort((a, b) => a.date - b.date)
    .map(({ month, count }) => ({ month, count }));

  const usersPerMonthData = Object.entries(
    users.reduce((acc, u) => {
      const date = u.updatedAt?.toDate ? u.updatedAt.toDate() : u.updatedAt;
      const month = new Date(date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  ).map(([month, count]) => ({ month, count }));

  const severityDistributionData = ["High", "Medium", "Low"].map((level) => ({
    name: level,
    value: reports.filter((r) => r.severity === level).length,
  }));

  const categories = [...new Set(reports.map((r) => r.category))];
  const categoryDistributionData = categories.map((cat) => ({
    name: cat,
    value: reports.filter((r) => r.category === cat).length,
  }));

  const resolvedReportsData = reports.filter(
    (r) => r.status?.toLowerCase() === "resolved" && r.resolvedAt
  );
  const timeToResolutionData = resolvedReportsData.map((r) => ({
    id: r.id,
    days: Math.round(
      (new Date(r.resolvedAt).getTime() - new Date(r.createdAt).getTime()) /
        (1000 * 60 * 60 * 24)
    ),
  }));

  return (
    <div className="p-6 flex flex-col gap-4">
      <select
        className="border p-2 rounded w-64"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        <option value="reportsPerMonth">Reports per Month</option>
        <option value="severityDistribution">Severity Distribution</option>
        <option value="usersPerMonth">User Signups per Month</option>
        <option value="categoryDistribution">Category Distribution</option>
      </select>

      {/* Chart Output */}
      <div className="mt-6 flex justify-center">
        {chartType === "reportsPerMonth" && (
          <LineChart width={700} height={300} data={reportsPerMonthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        )}
        {chartType === "usersPerMonth" && (
          <LineChart width={700} height={300} data={usersPerMonthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        )}
        {chartType === "severityDistribution" && (
          <PieChart width={400} height={300}>
            <Pie
              data={severityDistributionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {severityDistributionData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
        {chartType === "categoryDistribution" && (
          <BarChart width={700} height={300} data={categoryDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
        {chartType === "timeToResolution" && (
          <BarChart width={700} height={300} data={timeToResolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="days" fill="#82ca9d" />
          </BarChart>
        )}
      </div>

      <AnalyticsTable
        chartType={chartType}
        reportsPerMonthData={reportsPerMonthData}
        usersPerMonthData={usersPerMonthData}
        severityDistributionData={severityDistributionData}
        categoryDistributionData={categoryDistributionData}
        timeToResolutionData={timeToResolutionData}
      />
    </div>
  );
}

export default ChartSelector;
