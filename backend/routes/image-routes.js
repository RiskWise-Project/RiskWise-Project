const express = require("express");
const path = require("path");
const multer = require("multer");
const { generateCaption } = require("../controllers/image-controller");
const {
  summarizeReport,
  getReportsByUser,
} = require("../controllers/report-controller");
const authenticateFirebaseToken = require("../middleware/firebaseAuth");
const validateReport = require("../middleware/validateReport");

const router = express.Router();

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

router.post("/caption", upload.single("file"), generateCaption);
router.post("/summarize", validateReport, summarizeReport);
router.get("/reports/:userId", authenticateFirebaseToken, getReportsByUser);

module.exports = router;
