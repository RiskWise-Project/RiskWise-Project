import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import UploadRequirementModal from "./upload-requirement-modal";

function SignUpForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [firebaseTempUser, setFirebaseTempUser] = useState(null);

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
      await sendEmailVerification(userCred.user);

      const idToken = await userCred.user.getIdToken();
      await SignUpSend(
        {
          email: userCred.user.email,
          fullname: formData.fullname,
          studentNumber: formData.studentNumber,
        },
        idToken
      );

      toast.success("Verification email sent! Please check your inbox.");

      // Show upload modal after sign up
      setFirebaseTempUser(userCred.user);
      setShowUploadModal(true);
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

      // Show upload modal after Google signup
      setFirebaseTempUser(user);
      setShowUploadModal(true);
    } catch (err) {
      setError(err.message);
      toast.error("Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setFirebaseTempUser(null);
    navigate("/sign-in"); // redirect after upload or cancel
  };

  const handleUploaded = () => {
    setShowUploadModal(false);
    setFirebaseTempUser(null);
    navigate("/dashboard/profile"); // redirect after successful upload
  };

  return (
    <div className="flex flex-col items-center md:px-[5%] h-screen w-full bg-[var(--color-white)]">
      <div className="form-container w-full flex flex-col items-center">
        <div className="form-header flex flex-col w-[90%] lg:w-[70%] mb-8">
          <h1 className="font-black text-2xl tracking-wider whitespace-nowrap">
            {t("SignupComponent.signup_header")}
          </h1>
          <p className="subtext-signup text-sm">
            {t("SignupComponent.signup_subtext")}
          </p>
        </div>

        <form
          className="flex flex-col gap-4 w-[90%] lg:w-[70%]"
          onSubmit={handleSubmit}
        >
          <div className="input-container flex flex-col gap-2">
            <label htmlFor="fullname">{t("SignupComponent.fullname")}</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="studentNumber">Student Number</label>
            <input
              type="number"
              name="studentNumber"
              placeholder="2020123456"
              value={formData.studentNumber}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="input-container flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            {t("SignupComponent.terms_condition")}
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-highlight)] text-white py-2 rounded-md"
          >
            {loading ? "Creating..." : t("SignupComponent.signup_button")}
          </button>

          <button
            type="button"
            disabled={loading}
            className="w-full mt-3 border py-2 rounded-md flex gap-2 justify-center"
            onClick={handleGoogleSignup}
          >
            <img src={googleIcon} className="h-5 w-5" alt="Google" />
            {t("SignupComponent.google_button")}
          </button>

          <p className="text-center mt-4">
            {t("SignupComponent.dont_have_account")}{" "}
            <a
              href="/sign-in"
              className="text-[var(--color-highlight)] underline"
            >
              {t("SignupComponent.sign_up")}
            </a>
          </p>
        </form>
      </div>
      {showUploadModal && firebaseTempUser && (
        <UploadRequirementModal
          firebaseUser={firebaseTempUser}
          onClose={handleCloseModal}
          onUploaded={handleUploaded}
        />
      )}
    </div>
  );
}

export default SignUpForm;
