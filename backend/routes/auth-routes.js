const express = require("express");
const router = express.Router();
const {
  saveUser,
  fetchUser,
  uploadProfilePicture,
  uploadVerificationDocument,
  updateUser,
  promoteToAdmin,
} = require("../controllers/auth-controllers");

router.post("/create-users", saveUser);
router.get("/fetch-user", fetchUser);
router.post("/save-picture", uploadProfilePicture);
router.post("/upload-verification-document", uploadVerificationDocument);
router.post("/update-user", updateUser);
router.post("/make-admin", promoteToAdmin);

module.exports = router;
