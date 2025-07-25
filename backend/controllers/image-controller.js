const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const generateCaption = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = path.resolve(req.file.path);
    const imageStream = fs.createReadStream(imagePath);

    const form = new FormData();
    form.append("file", imageStream);
    const response = await axios.post("http://127.0.0.1:6000/caption", form, {
      headers: form.getHeaders(),
    });

    fs.unlinkSync(imagePath);

    const caption = response.data.analysis || "No caption generated";
    res.status(200).json({ analysis: caption });
  } catch (error) {
    console.error("Image captioning error:", {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
    });
    res.status(500).json({ error: "Failed to generate caption" });
  } finally {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};

module.exports = {
  generateCaption,
};
