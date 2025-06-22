import React from "react";

import googleIcon from "../../assets/logos/search.png";

function SignUpForm() {
  return (
    <div className="flex flex-col items-center md:px-[5%] h-screen w-full">
      <div className="form-container w-full flex flex-col items-center">
        <div className="form-header flex flex-col w-[90%] lg:w-[70%] mb-8">
          <h1 className=" font-black text-2xl tracking-wider whitespace-nowrap">
            CREATE AN ACCOUNT
          </h1>
          <p className="subtext-signup text-sm">
            Please fill in the details to sign up
          </p>
        </div>

        <form className="flex flex-col gap-4 w-[90%] lg:w-[70%]">
          <div className="input-container flex flex-col gap-2">
            <label htmlFor="fullname" className="">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="John Doe"
              className="px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="studentNumber" className="">
              Student Number:
            </label>
            <input
              type="number"
              name="studentNumber"
              id="studentNumber"
              placeholder="2020123456"
              max={9999999999}
              min={0}
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              className="no-spinner px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="email" className="">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              className="no-spinner px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="password" className="">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="no-spinner px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-col mb-4 gap-2">
            <label htmlFor="confirmPassword" className="">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className="no-spinner px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-row items-center mb-4 gap-2">
            <label htmlFor="terms" className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="cursor-pointer scale-125 transform"
              />
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer"
          >
            Sign up
          </button>

          <button className="w-full border border-gray-300 focus:outline-none py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer flex items-center justify-center gap-2">
            <img src={googleIcon} alt="Google" className="h-5 w-5" />
            Sign up with Google
          </button>

          <div className="no-account-container">
            <p className="text-center">
              Don't have an account?{" "}
              <a
                href="/sign-in"
                className="text-[var(--color-highlight)] underline hover:opacity-80"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
