const { db, admin } = require("../helper/firebase");

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
      console.warn("Missing or malformed Authorization header");
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    console.log("Received token:", idToken);
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const uid = decodedToken.uid;
    console.log("Decoded UID:", uid);

    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      console.warn(`User document not found for UID: ${uid}`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User document fetched:", userDoc.data());
    return res.status(200).json({ user: userDoc.data() });
  } catch (error) {
    console.error("Unexpected error in fetchUser:", error);

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
      email,
      fullname,
      studentNumber,
      college,
      yearLevel,
      section,
      course,
    } = req.body;

    // If nothing is provided, abort early
    if (
      !email &&
      !fullname &&
      !studentNumber &&
      !college &&
      !yearLevel &&
      !section &&
      !course
    ) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updates = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (email) updates.email = email;
    if (fullname) updates.fullname = fullname;
    if (studentNumber) updates.studentNumber = studentNumber;
    if (college) updates.college = college;
    if (yearLevel) updates.yearLevel = yearLevel;
    if (section) updates.section = section;
    if (course) updates.course = course;

    const userRef = db.collection("users").doc(uid);
    await userRef.set(updates, { merge: true });

    console.log("User updated successfully:", updates);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
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

const promoteToAdmin = async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.json({ success: true, message: `User ${uid} is now admin` });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  saveUser,
  fetchUser,
  updateUser,
  uploadProfilePicture,
  promoteToAdmin,
};
