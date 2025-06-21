import React from "react";
import googleIcon from "../../assets/logos/search.png";

function LoginFormContainer() {
  return (
    <div className="flex flex-col items-center md:pt-[10%] pt-[20%] md:px-[15%] h-screen w-full">
      <div className="form-container w-full">
        <div className="form-header flex flex-col items-center mb-8">
          <h1 className="text-center font-black text-4xl tracking-wider whitespace-nowrap">
            WELCOME BACK
          </h1>
          <p className="subtext-login text-center">
            Please enter your credentials
          </p>
        </div>
      </div>

      <form action="" className="w-full">
        <div className="form-group flex flex-col mb-4 gap-2">
          <label htmlFor="email">Email Address: </label>
          <input
            type="email"
            id="email"
            className="py-1 px-3 border border-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="form-group flex flex-col mb-6 gap-2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="py-1 px-3 border border-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="form-group flex flex-row items-center mb-6 gap-2">
          <input
            type="checkbox"
            id="show-password"
            name="show-password"
            className="scale-125 transform"
          />
          <label htmlFor="show-password">Show Password</label>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer"
        >
          Sign in
        </button>
      </form>

      <button className="w-full mt-6 border border-gray-300 focus:outline-none py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer flex items-center justify-center gap-2">
        <img src={googleIcon} alt="Google" className="h-5 w-5" />
        Sign in with Google
      </button>

      <div className="no-account-container mt-6">
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-[var(--color-highlight)] underline hover:opacity-80"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginFormContainer;
