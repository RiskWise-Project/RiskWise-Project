import { useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import googleIcon from "../../assets/logos/search.png";

function LoginFormContainer() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      // const idToken = await user.getIdToken();

      // Navigate to a protected route
      toast.success("Login successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success("Signed in with Google!");

      const idToken = await user.getIdToken();

      // Redirect to protected page
      // navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
            placeholder="Enter your password"
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
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="show-password">Show Password</label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
            loading ? "cursor-wait" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-6 border border-gray-300 focus:outline-none py-2 px-4 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
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
