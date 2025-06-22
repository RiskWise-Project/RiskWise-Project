const { admin } = require("../helper/firebase");

const authenticateFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.email_verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error });
  }
};

module.exports = authenticateFirebaseToken;
