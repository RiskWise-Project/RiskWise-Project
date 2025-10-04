import { useState, useEffect, useRef } from "react";
import { UserPen, SquarePen } from "lucide-react";
import { getAuth } from "firebase/auth";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";

import {
  FetchUser,
  SavePicture,
  updateUserProfile,
} from "../../../services/auth-services";

import dhvsuCourses from "../../../data/dashboard-data/dhvsu-courses";
import toast from "react-hot-toast";

function LeftSideProfile() {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const tokenID = await currentUser.getIdToken();

    if (!currentUser) {
      return;
    }

    try {
      await updateUserProfile(
        {
          studentNumber: user.studentNumber,
          college: user.college,
          yearLevel: user.yearLevel,
          section: user.section,
          course: user.course,
        },
        tokenID
      );

      toast.success("User Updated Successful!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("No authenticated user found.");
      return;
    }

    const tokenID = await currentUser.getIdToken();

    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 500,
      });
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });

      setPreview(base64String);

      const response = await SavePicture(
        { profileImageBase64: base64String },
        tokenID
      );

      if (response.success) {
        toast.success("User image saved successfully!");
        fetchUserData();
      } else {
        toast.error(`Failed to save image: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Image upload failed: ${error.message || error}`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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

  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    const first = words[0]?.[0] || "";
    const second = words[1]?.[0] || "";
    return (first + second).toUpperCase();
  };

  const getRandomColor = (seed) => {
    const colors = [
      "#F87171",
      "#FBBF24",
      "#34D399",
      "#60A5FA",
      "#A78BFA",
      "#F472B6",
      "#FCD34D",
    ];
    const index = seed
      ? seed.charCodeAt(0) % colors.length
      : Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="left-side-profile-container flex flex-col gap-10 items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="relative group profile-container overflow-hidden rounded-full aspect-square md:h-60 h-50 mb-4">
            {preview || user?.profileImageBase64 ? (
              <img
                src={preview || user?.profileImageBase64}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                style={{
                  backgroundColor: getRandomColor(user?.fullname),
                }}
              >
                {getInitials(user?.fullname)}
              </div>
            )}

            <button
              onClick={triggerFileInput}
              className="hidden md:flex absolute top-0 flex-col justify-center items-center w-full h-full bg-[var(--color-highlight)] cursor-pointer text-[var(--color-white)] p-2 rounded-full transition-all ease-in-out duration-150 opacity-0 group-hover:opacity-75"
            >
              <UserPen className="w-10 h-10" />
              <span className="text-sm">{t("ProfilePage.edit_photo")}</span>
            </button>
          </div>

          <button
            onClick={triggerFileInput}
            className="flex md:hidden items-center justify-center gap-1 text-[var(--color-highlight)] text-xs mt-1 mb-3 "
          >
            <UserPen className="w-4 h-4" />
            {t("ProfilePage.edit_photo")}
          </button>
        </div>

        <div className="user-info text-center">
          <h2 className="md:text-3xl text-2xl md:font-bold font-black tracking-wider text-[var(--color-highlight)]">
            {user?.fullname || "Loading..."}
          </h2>
          <p className="md:text-xl text-base font-bold tracking-wider opacity-50 ">
            {user?.email || "Loading..."}
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="recent-reports-container md:w-[80%] w-full">
        <div className="form-container-header w-full flex items-center justify-between mb-4">
          <div className="flex flex-col items-start">
            <h2 className="md:text-2xl text-xl font-black tracking-wide">
              {t("ProfilePage.profile_information")}
            </h2>
            <p className="text-xs opacity-50">
              {t("ProfilePage.joined_riskwise")}{" "}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Loading..."}
            </p>
          </div>

          <button
            className={`text-[var(--color-highlight)] px-4 rounded transition-colors ${
              isEditing ? "hidden" : ""
            }`}
            onClick={toggleEdit}
          >
            <SquarePen
              className="md:w-6 md:h-6 w-7 h-7 text-[var(--color-highlight)] font-black cursor-pointer"
              strokeWidth={2.5}
            />
          </button>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={updateUser}>
          <div className="form-group">
            <label className="opacity-50 font-semibold md:text-base text-sm">
              Student Number:{" "}
            </label>
            {isEditing ? (
              <input
                type="number"
                placeholder="2020123456"
                max={9999999999}
                min={0}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                required
                value={user?.studentNumber || ""}
                onChange={handleChange}
                name="studentNumber"
                onInput={(e) => {
                  if (e.target.value.length > 10) {
                    e.target.value = e.target.value.slice(0, 10);
                  }
                }}
              />
            ) : (
              <p className="md:text-lg text-base font-semibold w-full p-2 border border-gray-300 rounded">
                {user?.studentNumber || "Loading..."}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="opacity-50 font-semibold md:text-base text-sm">
              {t("ProfilePage.college_department")}
            </label>
            {isEditing ? (
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                value={user?.college || ""}
                onChange={handleChange}
                name="college"
              >
                <option value="" disabled>
                  {t("ProfilePage.select_your_college")}
                </option>
                {Object.keys(dhvsuCourses).map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            ) : (
              <p className="md:text-lg text-base font-semibold w-full p-2 border border-gray-300 rounded">
                {user?.college || "Loading..."}
              </p>
            )}
          </div>

          <div className="form-group-container flex justify-between gap-5">
            <div className="form-group w-[50%]">
              <label className="opacity-50 font-semibold md:text-base text-sm">
                {t("ProfilePage.year_level")}
              </label>
              {isEditing ? (
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                  value={user?.yearLevel || ""}
                  onChange={handleChange}
                  name="yearLevel"
                >
                  <option value="" disabled>
                    {t("ProfilePage.select_your_year_level")}
                  </option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              ) : (
                <p className="md:text-lg text-base font-semibold w-full p-2 border border-gray-300 rounded">
                  {user?.yearLevel || "Loading..."}
                </p>
              )}
            </div>
            <div className="form-group w-[50%]">
              <label className="opacity-50 font-semibold md:text-base text-sm">
                {t("ProfilePage.section")}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Section Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                  value={user?.section || ""}
                  onChange={handleChange}
                  name="section"
                />
              ) : (
                <p className="md:text-lg text-base font-semibold w-full p-2 border border-gray-300 rounded">
                  {user?.section || "Loading..."}
                </p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="opacity-50 font-semibold md:text-base text-sm">
              {t("ProfilePage.program_course")}
            </label>
            {isEditing ? (
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                value={user?.course || ""}
                onChange={handleChange}
                name="course"
                disabled={!user?.college}
              >
                <option value="" disabled>
                  {user?.college ? "Select a course" : "Select a college first"}
                </option>
                {dhvsuCourses[user?.college]?.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            ) : (
              <p className="md:text-lg text-base font-semibold w-full p-2 border border-gray-300 rounded">
                {user?.course || "Loading..."}
              </p>
            )}
          </div>

          {isEditing && (
            <button
              type="submit"
              className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 mt-5 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
                loading ? "cursor-wait" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading
                ? t("ProfilePage.saving_profile")
                : t("ProfilePage.save_profile")}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default LeftSideProfile;
