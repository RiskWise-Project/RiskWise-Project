import { useState, useEffect, useRef } from "react";
import { UserPen } from "lucide-react";
import { getAuth } from "firebase/auth";
import imageCompression from "browser-image-compression";
import PlaceholderImg from "../../../assets/resources/Profile-placeholder.jpg";

import { FetchUser, SavePicture } from "../../../services/auth-services";

function LeftSideProfile() {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("No authenticated user found.");
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
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;

        setPreview(base64String);

        try {
          const response = await SavePicture(
            {
              profileImageBase64: base64String,
            },
            tokenID
          );

          if (response.success) {
            console.log("User image saved as base64.");
            fetchUserData();
          } else {
            console.error("Failed to save base64 image:", response.message);
          }
        } catch (err) {
          console.error("Error saving base64 image:", err);
        }
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      alert("Failed to compress the image.");
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
        console.error("No authenticated user found.");
        return;
      }

      const tokenID = await currentUser.getIdToken();
      const response = await FetchUser(tokenID);

      if (response.success) {
        setUser(response.user);
      } else {
        console.error("Failed to fetch user data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="left-side-profile-container flex flex-col gap-10 items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="relative group profile-container overflow-hidden rounded-full aspect-square md:h-70 h-50 mb-4">
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
              <span className="text-sm">Edit Profile</span>
            </button>
          </div>

          <button
            onClick={triggerFileInput}
            className="flex md:hidden items-center gap-2 text-[var(--color-highlight)] text-sm mt-1 mb-3 "
          >
            <UserPen className="w-5 h-5" />
            Edit Photo
          </button>
        </div>

        <div className="user-info text-center">
          <h2 className="md:text-3xl text-2xl font-bold tracking-wider text-[var(--color-highlight)]">
            {user?.fullname || "Loading..."}
          </h2>
          <p className="md:text-xl font-bold tracking-wider opacity-50 ">
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

      <div className="recent-reports-container w-full">
        <h3 className="md:text-2xl text-xl font-black tracking-wider text-[var(--color-highlight)]">
          Recent Reports
        </h3>
        <div className="reports-container"></div>
      </div>
    </div>
  );
}

export default LeftSideProfile;
