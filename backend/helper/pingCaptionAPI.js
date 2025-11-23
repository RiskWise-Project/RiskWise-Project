const axios = require("axios");

async function pingCaptionAPI() {
  try {
    const response = await axios.get(process.env.CAPTION_API_URL + "/health");
    console.log("Caption API is healthy:", response.status);
    return true;
  } catch (err) {
    console.error("Caption API ping failed:", err.message || err);
    return false;
  }
}

module.exports = { pingCaptionAPI };
