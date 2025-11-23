import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { riskwise_symbol } from "../assets/logos/logo";
import { FetchUser } from "../services/auth-services";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenID = await firebaseUser.getIdToken();

          const { success, user: dbUser } = await FetchUser(tokenID);

          if (success && dbUser) {
            setUser({
              ...firebaseUser,
              role: dbUser?.role || "user",
              ...dbUser,
            });
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error("ProtectedRoute error:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  // ⏳ Show loader while checking auth
  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-highlight)] border-t-transparent animate-spin" />
          <img
            src={riskwise_symbol}
            alt="RiskWise logo"
            className="w-8 h-8 absolute opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <p className="mt-4 text-[var(--color-highlight)] font-medium animate-pulse">
          Loading RiskWise...
        </p>
      </div>
    );
  }

  // 🔐 No Firebase user → redirect to sign-in
  if (!user) return <Navigate to="/sign-in" replace />;

  // 🚦 Role-based access check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // redirect based on actual role
    const fallback =
      user.role === "admin" ? "/admin/dashboard" : "/dashboard/profile";
    console.log("Allowed:", allowedRoles, "User Role:", user?.role);
    return <Navigate to={fallback} replace />;
  }

  return children;
}
