import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import googleIcon from "../../assets/logos/search.png";
import { useTranslation } from "react-i18next";

import { SignUpSend } from "../../services/auth-services";

function LoginFormContainer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoginLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setLoginLoading(false);
        return;
      }

      toast.success("Login successful!");
      navigate("/dashboard/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success("Signed in with Google!");

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
      toast.error(err.message || "Google sign-in failed.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center text-[var(--color-dark)] bg-[var(--color-white)] md:pt-[10%] pt-[20%] md:px-[15%] h-screen w-full">
      <div className="form-container w-full">
        <div className="form-header flex flex-col items-center mb-8">
          <h1 className="text-center font-black text-4xl tracking-wider whitespace-nowrap">
            {t("LoginComponent.header")}
          </h1>
          <p className="subtext-login text-center">
            {t("LoginComponent.subtext")}
          </p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="w-full">
        <div className="form-group flex flex-col mb-4 gap-2">
          <label htmlFor="email">Email Address: </label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="form-group flex flex-col mb-6 gap-2">
          <label htmlFor="password">Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("LoginComponent.password_placeholder")}
            className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="form-group flex flex-row items-center mb-6 gap-2">
          <input
            type="checkbox"
            id="show-password"
            name="show-password"
            className="scale-125 transform"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          <label htmlFor="show-password">
            {t("LoginComponent.show_password_label")}
          </label>
        </div>

        <div className="flex justify-end mb-5">
          <button
            onClick={handleForgotPassword}
            type="button"
            className={`text-[var(--color-highlight)] underline hover:opacity-80  transition-all duration-200 ${
              resetLoading ? "cursor-wait opacity-60" : "cursor-pointer"
            }`}
            disabled={resetLoading}
          >
            {resetLoading
              ? t("LoginComponent.sending_email")
              : t("LoginComponent.forgot_password_label")}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
            loginLoading ? "cursor-wait" : "cursor-pointer"
          }`}
          disabled={loginLoading}
        >
          {loginLoading
            ? t("LoginComponent.sign_in_button_loading")
            : t("LoginComponent.sign_in_button")}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-6 border border-gray-300 focus:outline-none py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <img src={googleIcon} alt="Google" className="h-5 w-5" />
        {t("LoginComponent.google_button")}
      </button>

      <div className="no-account-container mt-6">
        <p className="text-center mt-4">
          {t("LoginComponent.dont_have_account")}{" "}
          <a
            href="/sign-up"
            className="text-[var(--color-highlight)] underline hover:opacity-80"
          >
            {t("LoginComponent.sign_up")}
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginFormContainer;
