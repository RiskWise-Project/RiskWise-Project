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
