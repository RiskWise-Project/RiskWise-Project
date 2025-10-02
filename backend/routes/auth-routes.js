const express = require("express");
const router = express.Router();
const {
  saveUser,
  fetchUser,
  uploadProfilePicture,
  updateUser,
  promoteToAdmin,
} = require("../controllers/auth-controllers");

router.post("/create-users", saveUser);
router.get("/fetch-user", fetchUser);
router.post("/save-picture", uploadProfilePicture);
router.post("/update-user", updateUser);
router.post("/make-admin", promoteToAdmin);

module.exports = router;
