import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEVELOPMENT
    : import.meta.env.VITE_API_URL;

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
