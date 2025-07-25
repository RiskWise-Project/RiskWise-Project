const express = require("express");
const path = require("path");
const multer = require("multer");
const { generateCaption } = require("../controllers/image-controller");

const router = express.Router();

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

router.post("/caption", upload.single("file"), generateCaption);

module.exports = router;
