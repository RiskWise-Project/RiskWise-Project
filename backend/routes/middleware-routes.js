const express = require("express");
const authenticateFirebaseToken = require("../middleware/firebaseAuth");
const router = express.Router();

router.get("/protected", authenticateFirebaseToken, (req, res) => {
  res.json({
    message: "Access granted to protected resource.",
    user: req.user,
  });
});

module.exports = router;
