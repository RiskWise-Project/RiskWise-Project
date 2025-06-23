import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-hot-toast";

import googleIcon from "../../assets/logos/search.png";
import { SignUpSend } from "../../services/auth-services";

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    studentNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password, confirmPassword, termsAccepted } = formData;

    if (!termsAccepted) {
      setError("You must agree to the terms and conditions.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCred.user.getIdToken();
      await sendEmailVerification(userCred.user);
      await SignUpSend(
        {
          email: userCred.user.email,
          fullname: formData.fullname,
          studentNumber: formData.studentNumber,
        },
        idToken
      );

      toast.success("Verification email sent! Please check your inbox.");
      navigate("/sign-in");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const idToken = await user.getIdToken();

      await SignUpSend(
        {
          email: user.email,
          fullname: user.displayName || "No Name",
          studentNumber: "N/A",
        },
        idToken
      );

      toast.success("Google sign-up successful!");
      navigate("/dashboard/profile");
    } catch (err) {
      console.error("Google signup error:", err.message);
      setError(err.message);
      toast.error("Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

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

        <form
          className="flex flex-col gap-4 w-[90%] lg:w-[70%]"
          onSubmit={handleSubmit}
        >
          <div className="input-container flex flex-col gap-2">
            <label htmlFor="fullname" className="">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
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
              value={formData.studentNumber}
              onChange={handleChange}
              required
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
              value={formData.email}
              onChange={handleChange}
              required
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
              value={formData.password}
              onChange={handleChange}
              required
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="no-spinner px-3 py-2 border border-gray-300 rounded appearance-none"
            />
          </div>

          <div className="input-container flex flex-row items-center mb-4 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
                className="cursor-pointer scale-125 transform"
              />
              I agree to the terms and conditions
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
              loading ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full border border-gray-300 focus:outline-none py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
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
