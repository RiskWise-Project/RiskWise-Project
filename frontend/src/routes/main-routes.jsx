import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user-side-pages/landing-page";
import AboutPage from "../pages/user-side-pages/about-page";

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
