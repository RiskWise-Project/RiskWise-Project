const express = require("express");
const { createUserProfile } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/create-users", createUserProfile);

module.exports = router;
