const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const generateCaption = async (req, res) => {
  let imagePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Use environment variable or default to localhost
    const baseURL = process.env.CAPTION_API_URL || "http://127.0.0.1:5000";
    console.log(`🔗 Using caption API: ${baseURL}`);

    imagePath = path.resolve(req.file.path);
    console.log(`📁 Processing image: ${imagePath}`);
    console.log(`📊 File size: ${req.file.size} bytes`);

    // Verify file exists and is readable
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // Test connection first
    console.log("🏥 Testing connection to caption service...");
    try {
      const healthCheck = await axios.get(`${baseURL}/`, {
        timeout: 5000,
      });
      console.log("✅ Caption service is healthy:", healthCheck.data);
    } catch (healthError) {
      console.log(
        "⚠️ Health check failed, proceeding anyway:",
        healthError.message
      );
    }

    // Create form data
    const imageStream = fs.createReadStream(imagePath);
    const form = new FormData();
    form.append("file", imageStream, {
      filename: req.file.originalname || "image.jpg",
      contentType: req.file.mimetype || "image/jpeg",
    });

    console.log("📤 Sending image to caption service...");
    console.log("📋 Form headers:", form.getHeaders());

    const response = await axios.post(`${baseURL}/caption`, form, {
      headers: {
        ...form.getHeaders(),
        Accept: "application/json",
      },
      timeout: 60000, // 60 second timeout for ML processing
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("✅ Caption API response status:", response.status);
    console.log("📝 Caption API response data:", response.data);

    // Extract caption from response
    const caption =
      response.data.analysis ||
      response.data.caption ||
      response.data.result ||
      "No caption generated";

    if (!caption || caption.trim() === "") {
      throw new Error("Empty caption received from service");
    }

    console.log(`🎯 Generated caption: "${caption}"`);
    res.status(200).json({ analysis: caption });
  } catch (error) {
    console.error("💥 Image captioning error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      responseData: error.response?.data,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Provide specific error messages
    let errorMessage = "Failed to generate caption";
    let statusCode = 500;

    if (error.code === "ECONNREFUSED") {
      errorMessage = "Caption service is not available";
      statusCode = 503;
    } else if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      errorMessage = "Caption service timeout - image processing took too long";
      statusCode = 408;
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.error || "Invalid image format";
      statusCode = 400;
    } else if (error.response?.status === 500) {
      errorMessage = "Caption service internal error";
      statusCode = 502;
    }

    res.status(statusCode).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  } finally {
    // Clean up the uploaded file
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
        console.log(`🗑️ Cleaned up file: ${imagePath}`);
      } catch (cleanupError) {
        console.error("❌ File cleanup error:", cleanupError.message);
      }
    }
  }
};

// Test function to verify caption service connectivity
const testCaptionService = async () => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:5000"
      : process.env.CAPTION_API_URL;

  try {
    console.log(`🧪 Testing caption service at ${baseURL}...`);
    const response = await axios.get(`${baseURL}/`, { timeout: 5000 });
    console.log("✅ Caption service test passed:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Caption service test failed:", error.message);
    return false;
  }
};

module.exports = {
  generateCaption,
  testCaptionService,
};
