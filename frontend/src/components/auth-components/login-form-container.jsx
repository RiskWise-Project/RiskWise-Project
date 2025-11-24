import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
} from "firebase/auth";
import googleIcon from "../../assets/logos/search.png";
import { useTranslation } from "react-i18next";
import { SignUpSend, FetchUser } from "../../services/auth-services";

export default function LoginFormContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({ login: false, reset: false });
  const [error, setError] = useState("");

  const startLoading = (key) => setLoading((prev) => ({ ...prev, [key]: true }));
  const stopLoading = (key) => setLoading((prev) => ({ ...prev, [key]: false }));

  // -------------------------------
  // ⚡ COMPLETE GOOGLE LOGIN LOGIC
  // -------------------------------
  const completeGoogleLogin = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken(true);

    const { success } = await FetchUser(token);
    if (!success) {
      await SignUpSend(
        {
          email: firebaseUser.email,
          fullname: firebaseUser.displayName || "No Name",
          studentNumber: "N/A",
        },
        token
      );
    }

    await redirectToDashboard(firebaseUser);
  };

  // -------------------------------
  // ⚡ HANDLE REDIRECT RESULT (PWA)
  // -------------------------------
  useEffect(() => {
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await completeGoogleLogin(result.user);
      }
    });
  }, []);

  // -------------------------------
  // ⚡ GOOGLE SIGN-IN HANDLER
  // -------------------------------
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    try {
      if (isPWA) {
        await signInWithRedirect(auth, provider);
      } else {
        const { user: firebaseUser } = await signInWithPopup(auth, provider);
        await completeGoogleLogin(firebaseUser);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // -------------------------------
  // NORMAL LOGIN
  // -------------------------------
  const redirectToDashboard = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken();
    const { success, user: dbUser } = await FetchUser(token);

    if (success && dbUser.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard/profile");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    startLoading("login");

    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!firebaseUser.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      toast.success("Login successful!");
      await redirectToDashboard(firebaseUser);
    } catch (err) {
      setError(parseFirebaseError(err));
    } finally {
      stopLoading("login");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    startLoading("reset");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch (err) {
      toast.error(parseFirebaseError(err));
    } finally {
      stopLoading("reset");
    }
  };

  const parseFirebaseError = (err) => {
    if (!err?.code) return err.message || "Unexpected error.";
    const map = {
      "auth/invalid-email": "Invalid email address.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/popup-closed-by-user": "Popup closed before completing sign in.",
    };
    return map[err.code] || err.message;
  };

  return (
    <!-- your JSX stays the same -->
  );
}