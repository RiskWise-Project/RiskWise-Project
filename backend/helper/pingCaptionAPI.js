const axios = require("axios");

async function pingCaptionAPI() {
  const baseURL = process.env.CAPTION_API_URL;
  if (!baseURL) {
    console.error("CAPTION_API_URL not set in environment variables");
    return false;
  }

  try {
    const response = await axios.get(`${baseURL}/health`, { timeout: 5000 });
    console.log("✅ Caption API is healthy:", response.status);
    return true;
  } catch (err) {
    console.error(
      "❌ Caption API ping failed:",
      err.response?.status || err.message
    );
    return false;
  }
}

module.exports = { pingCaptionAPI };
