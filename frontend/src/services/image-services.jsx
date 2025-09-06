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

export async function summarizeReportService(payload) {
  try {
    const response = await axios.post(`${baseURL}/summarize`, payload, {
      headers: {
        "Content-Type": "application/json", // ✅ important!
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Axios summarize report error:",
      error.response?.data || error.message
    );
    return { error: "Error summarizing report" };
  }
}

export async function fetchUserReports(userId, tokenID) {
  try {
    const response = await axios.get(`${baseURL}/reports/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenID}`,
      },
    });
    return response.data.reports || [];
  } catch (error) {
    console.error(
      "Axios fetch user reports error:",
      error.response?.data || error.message
    );
    return [];
  }
}
