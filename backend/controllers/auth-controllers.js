const { db } = require("../helper/firebase");
const admin = require("firebase-admin");

const saveUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const { email = decodedToken.email, fullname, studentNumber } = req.body;

    const provider = decodedToken.firebase.sign_in_provider;
    const authProvider = provider === "google.com" ? "google" : "email";

    if (!email || !fullname || !studentNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userRef = db.collection("users").doc(uid);
    await userRef.set(
      {
        uid,
        email,
        fullname,
        studentNumber,
        authProvider,
        role: "user",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log("User saved successfully:", {
      uid,
      email,
      fullname,
      studentNumber,
      authProvider,
    });

    return res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userDoc.data() });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const {
      email = decodedToken.email,
      studentNumber,
      college,
      yearLevel,
      section,
      course,
    } = req.body;

    if (!email || !studentNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userRef = db.collection("users").doc(uid);
    await userRef.set(
      {
        email,
        studentNumber,
        college,
        yearLevel,
        section,
        course,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log("User saved successfully:", {
      email,
      studentNumber,
      college,
      yearLevel,
      section,
      course,
    });

    return res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const { profileImageBase64 } = req.body;

    if (!profileImageBase64) {
      return res
        .status(400)
        .json({ message: "Missing profileImageBase64 in request body" });
    }

    const userRef = db.collection("users").doc(uid);
    await userRef.set(
      {
        profileImageBase64,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`Profile image updated for UID: ${uid}`);
    return res
      .status(200)
      .json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveUser, fetchUser, updateUser, uploadProfilePicture };
