import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import SideImageSignUp from "../../assets/resources/sign-up-image.webp";
import logo1x from "../../assets/logos/riskwise-logo-1x.webp";
import logo2x from "../../assets/logos/riskwise-logo-2x.webp";

const SignUpForm = React.lazy(() =>
  import("../../components/auth-components/sign-up-form-container")
);

function SignUpPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="main-container-signup h-screen grid grid-cols-1 md:grid-cols-2 transition-all overflow-hidden motion-safe:duration-300 motion-safe:ease-in-out"
    >
      <div className="left-side-container-signup">
        <div className="text-center">
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
            className="w-[12rem] md:w-[10rem] sm:w-[8rem] cursor-pointer md:m-[1%] transition-all motion-safe:duration-200"
          />
        </div>
        <div className="form-container flex flex-col items-center justify-center w-full h-full">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <SignUpForm />
          </Suspense>
        </div>
      </div>
      <div className="right-side-container-signup flex items-center justify-center bg-[var(--color-highlight)] ">
        <img
          src={SideImageSignUp}
          alt="Illustration for sign-up"
          loading="eager"
          fetchPriority="high"
          width="800"
          height="800"
          className="w-full max-w-4xl h-auto object-contain mx-auto transition-all motion-safe:duration-300"
        />
      </div>
    </motion.div>
  );
}

export default SignUpPage;
