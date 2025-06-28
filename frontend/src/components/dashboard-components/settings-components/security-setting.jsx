import { useState } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useTranslation } from "react-i18next";

import { toast } from "react-hot-toast";
import SecuritySide from "../../../assets/resources/side-picture.webp";

function SecuritySetting() {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const user = getAuth().currentUser;

      if (!user) {
        toast.error("No authenticated user.");
        setLoading(false);
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(
        err.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);

    try {
      const user = getAuth().currentUser;

      if (!user) {
        toast.error("No authenticated user.");
        setLoading(false);
        return;
      }

      await sendPasswordResetEmail(getAuth(), user.email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-5 text-[var(--color-dark)]">
      <div className="section-header w-full flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wide">
          {t("SecuritySetting.security_setting")}
        </h1>
      </div>

      <div className="setting-security-content-container flex flex-col w-full gap-3">
        <div className="setting-column grid md:grid-cols-3 w-full gap-5">
          <div className="security-form-container flex-col md:col-span-2 flex w-full gap-5">
            <div className="section-header w-full flex justify-between items-center">
              <h1 className="text-lg text-[var(--color-highlight)] font-black tracking-wide">
                {t("SecuritySetting.change_password")}
              </h1>
            </div>

            <form
              className="flex flex-col md:gap-4 gap-2"
              onSubmit={handleSubmit}
            >
              <div className="form-content-container flex flex-col md:gap-2 gap-1">
                <label
                  htmlFor="currentPassword"
                  className="opacity-75 font-semibold"
                >
                  {t("SecuritySetting.current_password")}
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder={t("SecuritySetting.enter_your_current_password")}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                />
              </div>

              <div className="form-content-container flex flex-col md:gap-2 gap-1">
                <label
                  htmlFor="newPassword"
                  className="opacity-75 font-semibold"
                >
                  {t("SecuritySetting.new_password")}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder={t("SecuritySetting.enter_your_new_password")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                />
              </div>
              <div className="form-content-container flex flex-col md:gap-2 gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="opacity-75 font-semibold"
                >
                  {t("SecuritySetting.confirm_password")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("SecuritySetting.confirm_your_new_password")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleForgotPassword}
                  className={`text-[var(--color-highlight)] underline hover:opacity-80 transition-all duration-200 ${
                    loading ? "cursor-wait opacity-60" : "cursor-pointer"
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? t("SecuritySetting.sending_email")
                    : t("SecuritySetting.forgot_password")}
                </button>
              </div>

              <button
                type="submit"
                className={`bg-[var(--color-highlight)] text-white py-2 mt-5 px-4 rounded-md hover:opacity-80 transition-all duration-200 ${
                  loading ? "cursor-wait opacity-60" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                {loading
                  ? t("SecuritySetting.changing_password")
                  : t("SecuritySetting.change_password_action")}
              </button>
            </form>
          </div>
          <div className="md:flex justify-center items-center hidden">
            <img src={SecuritySide} alt="" className="mx-auto my-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySetting;
