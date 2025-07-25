import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEVELOPMENT
    : import.meta.env.VITE_API_URL;

export async function analyzeImageService(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${baseURL}/caption`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.analysis || response.data.error;
  } catch (error) {
    console.error("Axios AI call error:", error);
    return "Error calling AI service";
  }
}
