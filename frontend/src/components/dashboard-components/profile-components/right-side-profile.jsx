import React, { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { getAuth } from "firebase/auth";
import { FetchUser } from "../../../services/auth-services";
import { updateUserProfile } from "../../../services/auth-services";

import dhvsuCourses from "../../../data/dashboard-data/dhvsu-courses";
import toast from "react-hot-toast";

function RightSideProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.error("No authenticated user found.");
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
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No authenticated user found.");
        return;
      }

      const tokenID = await currentUser.getIdToken();

      try {
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
          console.log("User data fetched successfully:", mergedUser);
        } else {
          console.error("Failed to fetch user data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="right-side-profile-container flex flex-col gap-4 items-center md:w-[70%] w-full mb-35 md:mr-50  mx-auto h-full justify-center p-4">
      <div className="form-container-header w-full flex items-center justify-between mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold tracking-wider">
            Profile Information
          </h2>
          <p className="text-xs opacity-50">
            Joined RiskWise:{" "}
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
          <label className="opacity-50 font-semibold">Student Number: </label>
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
            <p className="text-lg font-semibold w-full p-2 border border-gray-300 rounded">
              {user?.studentNumber || "Loading..."}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="opacity-50 font-semibold">
            College/Department:
          </label>
          {isEditing ? (
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
              value={user?.college || ""}
              onChange={handleChange}
              name="college"
            >
              <option value="" disabled>
                Select your college
              </option>
              {Object.keys(dhvsuCourses).map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-lg font-semibold w-full p-2 border border-gray-300 rounded">
              {user?.college || "Loading..."}
            </p>
          )}
        </div>

        <div className="form-group-container flex justify-between gap-5">
          <div className="form-group w-[50%]">
            <label className="opacity-50 font-semibold ">Year Level:</label>
            {isEditing ? (
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                value={user?.yearLevel || ""}
                onChange={handleChange}
                name="yearLevel"
              >
                <option value="" disabled>
                  Select your year level
                </option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
            ) : (
              <p className="text-lg font-semibold w-full p-2 border border-gray-300 rounded">
                {user?.yearLevel || "Loading..."}
              </p>
            )}
          </div>
          <div className="form-group w-[50%]">
            <label className="opacity-50 font-semibold">Section:</label>
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
              <p className="text-lg font-semibold w-full p-2 border border-gray-300 rounded">
                {user?.section || "Loading..."}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="opacity-50 font-semibold">Program/Course:</label>
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
            <p className="text-lg font-semibold w-full p-2 border border-gray-300 rounded">
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
            {loading ? "Saving profile..." : "Save Profile"}
          </button>
        )}
      </form>
    </div>
  );
}

export default RightSideProfile;
