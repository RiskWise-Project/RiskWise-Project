import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
            <Suspense fallback={<div>Loading...</div>}>
              <SubmitReportPage />
            </Suspense>
          }
        />
        <Route
          path="risk-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <h1>Risks List Page</h1>
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SettingPage />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
