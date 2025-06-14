const express = require("express");
const router = express.Router();
const { submitConcern } = require("../controllers/concerns-controller");

router.post("/submit-concern", submitConcern);

module.exports = router;
