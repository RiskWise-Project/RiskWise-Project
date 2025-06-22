import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user-side-pages/landing-page";

const AboutPage = React.lazy(() =>
  import("../pages/user-side-pages/about-page.jsx")
);
<<<<<<< HEAD
import SignInPage from "../pages/auth-pages/sign-in-page";
const SignUpPage = React.lazy(() =>
  import("../pages/auth-pages/sign-up-page.jsx")
=======
const SignInPage = React.lazy(() =>
  import("../pages/auth-pages/sign-in-page.jsx")
>>>>>>> parent of ac4dd71 (RiskWise v1.2.2 --Created the auth pages UI and it is already responsive, checking for bugs and errors)
);

function MainRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
