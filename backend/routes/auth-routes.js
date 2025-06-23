const express = require("express");
const router = express.Router();
const { saveUser } = require("../controllers/auth-controllers");

router.post("/create-users", saveUser);

module.exports = router;
