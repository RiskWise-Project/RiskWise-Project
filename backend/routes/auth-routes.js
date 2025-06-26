const express = require("express");
const router = express.Router();
const {
  saveUser,
  fetchUser,
  uploadProfilePicture,
  updateUser,
} = require("../controllers/auth-controllers");

router.post("/create-users", saveUser);
router.get("/fetch-user", fetchUser);
router.post("/save-picture", uploadProfilePicture);
router.post("/update-user", updateUser);

module.exports = router;
