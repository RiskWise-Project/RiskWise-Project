import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const SignUpSend = async (formData, tokenID) => {
  try {
    await axios.post(
      `${baseURL}/create-users`,
      {
        fullname: formData.fullname,
        studentNumber: formData.studentNumber,
        email: formData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenID}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, message: "Registration successful" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Registration failed",
    };
  }
};

export const updateUserProfile = async (formData, tokenID) => {
  try {
    await axios.post(
      `${baseURL}/update-user`,
      {
        fullname: formData.fullname,
        email: formData.email,
        studentNumber: formData.studentNumber,
        college: formData.college,
        yearLevel: formData.yearLevel,
        section: formData.section,
        course: formData.course,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenID}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, message: "Registration successful" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Registration failed",
    };
  }
};

export const FetchUser = async (tokenID) => {
  try {
    const response = await axios.get(`${baseURL}/fetch-user`, {
      headers: {
        Authorization: `Bearer ${tokenID}`,
      },
    });

    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("FetchUser error:", error.response?.data || error.message);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user",
    };
  }
};

export const SavePicture = async (data, tokenID) => {
  try {
    const response = await axios.post(`${baseURL}/save-picture`, data, {
      headers: {
        Authorization: `Bearer ${tokenID}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("SaveUser error:", error.response?.data || error.message);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to save user data",
    };
  }
};

export const uploadRequirement = async (file, tokenID) => {
  try {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // get base64 part only
        reader.onerror = (error) => reject(error);
      });

    const documentBase64 = await toBase64(file);

    const response = await axios.post(
      `${baseURL}/upload-verification-document`,
      { documentBase64 },
      {
        headers: {
          Authorization: `Bearer ${tokenID}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Upload successful",
    };
  } catch (error) {
    console.error(
      "UploadRequirement error:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Upload failed",
    };
  }
};

export const pingServer = async () => {
  try {
    const response = await axios.get(`${baseURL}/ping`);
    return response.data;
  } catch (error) {
    console.error("Ping failed:", error.message);
    throw error;
  }
};
