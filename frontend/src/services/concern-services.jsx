import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.development.VITE_API_URL
    : import.meta.env.production.VITE_API_URL;

export const SendConcern = async ({ email, message }) => {
  try {
    const response = await axios.post(`${baseURL}/submit-concern`, {
      email,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send concern:", error);
    throw error;
  }
};
