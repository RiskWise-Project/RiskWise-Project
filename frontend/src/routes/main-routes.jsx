import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { riskwise_symbol } from "../assets/logos/logo.jsx";
import LandingPage from "../pages/user-side-pages/landing-page";
import ProtectedRoute from "./protected-routes.jsx";

const AboutPage = React.lazy(() =>
  import("../pages/user-side-pages/about-page.jsx")
);
const SignInPage = React.lazy(() =>
  import("../pages/auth-pages/sign-in-page.jsx")
);

const SignUpPage = React.lazy(() =>
  import("../pages/auth-pages/sign-up-page.jsx")
);

const Dashboard = React.lazy(() => import("../pages/dashboard/dashboard.jsx"));
const ProfilePage = React.lazy(() =>
  import("../pages/dashboard/dashboard-pages/profile-page.jsx")
);
const SettingPage = React.lazy(() =>
  import("../pages/dashboard/dashboard-pages/setting-page.jsx")
);
const SubmitReportPage = React.lazy(() =>
  import("../pages/dashboard/dashboard-pages/submit-report-page.jsx")
);

const ReportListPage = React.lazy(() =>
  import("../pages/dashboard/dashboard-pages/report-list-page.jsx")
);

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route
          path="report-risk"
          element={
            <Suspense
              fallback={
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
              }
            >
              <SubmitReportPage />
            </Suspense>
          }
        />
        <Route
          path="risk-list"
          element={
            <Suspense
              fallback={
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
              }
            >
              <ReportListPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense
              fallback={
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
              }
            >
              <SettingPage />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense
              fallback={
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
              }
            >
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
