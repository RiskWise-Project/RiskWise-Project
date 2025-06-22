import { useNavigate } from "react-router-dom";
import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";

import SideImage from "../../assets/resources/sign-in-side.webp";
import logo1x from "../../assets/logos/riskwise-logo-1x.webp";
import logo2x from "../../assets/logos/riskwise-logo-2x.webp";

const LoginFormContainer = React.lazy(() =>
  import("../../components/auth-components/login-form-container")
);

function SignInPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen grid grid-cols-1 md:grid-cols-4 transition-all overflow-hidden motion-safe:duration-300 motion-safe:ease-in-out"
    >
      <div className="hidden md:flex items-center justify-center bg-[var(--color-highlight)] col-span-2 p-4 transition-all motion-safe:duration-300">
        <img
          src={SideImage}
          alt="Illustration for sign-in"
          loading="eager"
          fetchPriority="high"
          width="800"
          height="800"
          className="w-full max-w-5xl h-auto object-contain mx-auto transition-all motion-safe:duration-300"
        />
      </div>

      <div className="flex flex-col col-span-2 w-full px-6 py-8 md:py-0 transition-all motion-safe:duration-300">
        <div className="mb-8 text-center">
          <img
            src={logo1x}
            srcSet={`${logo1x} 1x, ${logo2x} 2x`}
            decoding="async"
            alt="RiskWise Logo"
            width="192"
            height="71"
            loading="eager"
            fetchPriority="high"
            onClick={() => navigate("/")}
            className="w-[12rem] md:w-[10rem] sm:w-[8rem] cursor-pointer md:pt-[2%] transition-all motion-safe:duration-200"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <LoginFormContainer />
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
}

export default SignInPage;
