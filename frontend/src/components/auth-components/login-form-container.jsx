import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebase";
import {
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signInWithRedirect,
sendPasswordResetEmail,
getRedirectResult,
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

const startLoading = (key) =>
setLoading((prev) => ({ ...prev, [key]: true }));
const stopLoading = (key) =>
setLoading((prev) => ({ ...prev, [key]: false }));

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


// Reuse your existing logic
async function completeGoogleLogin(firebaseUser) {
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
}


const handleGoogleSignIn = async () => {
const provider = new GoogleAuthProvider();

// Detect PWA standalone mode
const isPWA =
window.matchMedia("(display-mode: standalone)").matches ||
window.navigator.standalone === true;

try {
if (isPWA) {
// In PWA: popup is blocked → use redirect
await signInWithRedirect(auth, provider);
} else {
// In browser: popup works
const { user: firebaseUser } = await signInWithPopup(auth, provider);
await completeGoogleLogin(firebaseUser);
}
} catch (err) {
console.error(err);
}
};


useEffect(() => {
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        await completeGoogleLogin(result.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  handleRedirectResult();
}, []);

const handleForgotPassword = async () => {
if (!email) {
toast.error("Please enter your email address first.");
return;
}

startLoading("reset");  
try {  
  await sendPasswordResetEmail(auth, email);  
  toast.success("Password reset email sent. Check your inbox.");  
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
<div className="flex flex-col items-center text-[var(--color-dark)] bg-[var(--color-white)] md:pt-[10%] pt-[20%] md:px-[15%] h-screen w-full">
<div className="form-container w-full">
<div className="form-header flex flex-col items-center mb-8">
<h1 className="text-center font-black text-4xl tracking-wider">
{t("LoginComponent.header")}
</h1>
<p className="subtext-login text-center">
{t("LoginComponent.subtext")}
</p>
</div>
</div>

<form onSubmit={handleLogin} className="w-full space-y-4">  
    <div className="form-group flex flex-col gap-2">  
      <label htmlFor="email">Email Address:</label>  
      <input  
        id="email"  
        type="email"  
        value={email}  
        required  
        onChange={(e) => setEmail(e.target.value)}  
        placeholder="example@email.com"  
        className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"  
      />  
    </div>  

    <div className="form-group flex flex-col gap-2">  
      <label htmlFor="password">Password:</label>  
      <input  
        id="password"  
        type={showPassword ? "text" : "password"}  
        value={password}  
        required  
        onChange={(e) => setPassword(e.target.value)}  
        placeholder={t("LoginComponent.password_placeholder")}  
        className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"  
      />  
    </div>  

    <div className="flex items-center gap-2">  
      <input  
        id="show-password"  
        type="checkbox"  
        checked={showPassword}  
        onChange={() => setShowPassword((p) => !p)}  
        className="scale-125"  
      />  
      <label htmlFor="show-password">  
        {t("LoginComponent.show_password_label")}  
      </label>  
    </div>  

    <div className="flex justify-end">  
      <button  
        type="button"  
        onClick={handleForgotPassword}  
        disabled={loading.reset}  
        className={`text-[var(--color-highlight)] underline hover:opacity-80 transition-all duration-200 ${  
          loading.reset ? "opacity-60 cursor-wait" : ""  
        }`}  
      >  
        {loading.reset  
          ? t("LoginComponent.sending_email")  
          : t("LoginComponent.forgot_password_label")}  
      </button>  
    </div>  

    {error && <p className="text-red-500 text-sm">{error}</p>}  

    <button  
      type="submit"  
      disabled={loading.login}  
      className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all duration-200 ${  
        loading.login ? "cursor-wait" : "cursor-pointer"  
      }`}  
    >  
      {loading.login  
        ? t("LoginComponent.sign_in_button_loading")  
        : t("LoginComponent.sign_in_button")}  
    </button>  
  </form>  

  <button  
    onClick={handleGoogleSignIn}  
    disabled={loading.login}  
    className="w-full mt-6 border border-gray-300 py-2 px-4 rounded-md hover:opacity-80 transition-all duration-200 flex items-center justify-center gap-2"  
  >  
    <img src={googleIcon} alt="Google" className="h-5 w-5" />  
    {t("LoginComponent.google_button")}  
  </button>  

  <p className="text-center mt-6">  
    {t("LoginComponent.dont_have_account")}{" "}  
    <a  
      href="/sign-up"  
      className="text-[var(--color-highlight)] underline hover:opacity-80"  
    >  
      {t("LoginComponent.sign_up")}  
    </a>  
  </p>  
</div>

);
}