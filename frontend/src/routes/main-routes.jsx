import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user-side-pages/landing-page";

const AboutPage = React.lazy(() =>
  import("../pages/user-side-pages/about-page.jsx")
);
const SignInPage = React.lazy(() =>
  import("../pages/auth-pages/sign-in-page.jsx")
);

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
