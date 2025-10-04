import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { riskwise_symbol } from "../assets/logos/logo.jsx";
import LandingPage from "../pages/user-side-pages/landing-page";
import ProtectedRoute from "./protected-routes.jsx";

// Lazy imports
const AboutPage = lazy(() => import("../pages/user-side-pages/about-page.jsx"));
const SignInPage = lazy(() => import("../pages/auth-pages/sign-in-page.jsx"));
const SignUpPage = lazy(() => import("../pages/auth-pages/sign-up-page.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard.jsx"));
const ProfilePage = lazy(() =>
  import("../pages/dashboard/dashboard-pages/profile-page.jsx")
);
const SettingPage = lazy(() =>
  import("../pages/dashboard/dashboard-pages/setting-page.jsx")
);
const SubmitReportPage = lazy(() =>
  import("../pages/dashboard/dashboard-pages/submit-report-page.jsx")
);
const ReportListPage = lazy(() =>
  import("../pages/dashboard/dashboard-pages/report-list-page.jsx")
);
const AdminMainPage = lazy(() =>
  import("../pages/admin-dashboard-pages/admin-main-page.jsx")
);
const AdminDashboard = lazy(() =>
  import(
    "../pages/admin-dashboard-pages/admin-dashoard-sub-pages/admin-dashboard.jsx"
  )
);
const AdminAnalytics = lazy(() =>
  import(
    "../pages/admin-dashboard-pages/admin-dashoard-sub-pages/admin-analytics.jsx"
  )
);

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-highlight)] border-t-transparent animate-spin"></div>
        <img
          src={riskwise_symbol}
          alt="RiskWise logo"
          className="w-8 h-8 absolute opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p className="mt-4 text-[var(--color-highlight)] font-medium animate-pulse">
        Loading RiskWise...
      </p>
    </div>
  );
}

export default function MainRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminMainPage />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="report-risk" element={<SubmitReportPage />} />
          <Route path="risk-list" element={<ReportListPage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
