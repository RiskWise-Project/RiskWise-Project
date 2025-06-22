const { admin, db } = require("../helper/firebase");

const createUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const { fullname, studentNumber, email } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userRef = db.collection("users").doc(uid);
    const docSnap = await userRef.get();

    if (docSnap.exists) {
      await userRef.set(
        {
          fullname,
          studentNumber: studentNumber || null,
          email,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      return res.status(200).json({ message: "User profile updated" });
    }

    await userRef.set({
      fullname,
      studentNumber: studentNumber || null,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(201).json({ message: "User profile created" });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ message: "Failed to save user profile" });
  }
};

module.exports = { createUserProfile };
