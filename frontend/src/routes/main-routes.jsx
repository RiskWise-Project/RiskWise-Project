import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user-side-pages/landing-page";

const AboutPage = React.lazy(() =>
  import("../pages/user-side-pages/about-page.jsx")
);

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
