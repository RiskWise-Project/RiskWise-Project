import { useEffect, useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
} from "firebase/auth";
import { toast } from "react-hot-toast";

import { updateUserProfile, FetchUser } from "../../../services/auth-services";

function ProfileSettingSection() {
  const [currentUser, setUser] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleConfirmation = () => {
    setConfirmationModal(!confirmationModal);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          toast.error("No authenticated user found.");
          return;
        }

        const tokenID = await currentUser.getIdToken();
        const response = await FetchUser(tokenID);

        if (response.success) {
          const firestoreUser = response.user;

          const mergedUser = {
            ...firestoreUser,
            metadata: {
              creationTime: currentUser.metadata.creationTime,
              lastSignInTime: currentUser.metadata.lastSignInTime,
            },
          };

          setUser(mergedUser);
        } else {
          toast.error("Failed to fetch user data:", response.message);
        }
      } catch (error) {
        toast.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      if (email !== user.email) {
        await verifyBeforeUpdateEmail(user, email);
        toast.success("Verification link sent to your new email.");
      }

      const tokenID = await user.getIdToken();
      await updateUserProfile({ fullname: fullname, email: email }, tokenID);

      toggleConfirmation();
      setCurrentPassword("");

      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.fullname) setFullname(currentUser.fullname);
      if (currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  return (
    <div className="w-full h-fit flex flex-col gap-5 text-[var(--color-dark)]">
      <div className="section-header w-full flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wide">Profile Setting</h1>
        <button
          onClick={toggleConfirmation}
          className={`bg-[var(--color-highlight)] text-white py-2 px-4 rounded-md hover:opacity-80 transition-all duration-200 ${
            loading ? "cursor-wait opacity-60" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          Save
        </button>
      </div>

      <div className="setting-profile-content-container md:flex-row flex-col flex w-full md:gap-20 gap-5">
        <div className="container-content-form md:w-[50%] w-full flex flex-col gap-2">
          <label htmlFor="fullname" className="opacity-75 font-semibold">
            Full Name:
          </label>
          <input
            type="text"
            name="fullname"
            placeholder="John Doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
          />
        </div>

        <div className="container-content-form md:w-[50%] w-full flex flex-col gap-2">
          <label htmlFor="email" className="opacity-75 font-semibold">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
          />
        </div>
      </div>

      {confirmationModal && (
        <div className="password-confirmation-modal fixed inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur-sm">
          <div className="confirmation-container bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-3 text-center">
              Confirm Your Password
            </h2>
            <label htmlFor="password" className="opacity-75 font-semibold">
              Current Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] mt-1"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-[var(--color-highlight)] text-white py-2 px-4 rounded hover:opacity-90 transition-all disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Email"}
            </button>
            <button
              onClick={toggleConfirmation}
              className="mt-2 w-full text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettingSection;
