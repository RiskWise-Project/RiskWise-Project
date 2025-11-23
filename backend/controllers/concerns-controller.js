const { db, admin } = require("../helper/firebase");

const submitConcern = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    const docRef = await db.collection("concerns").add({
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Firestore write success:", docRef.id);
    res
      .status(201)
      .json({ id: docRef.id, message: "Concern submitted successfully" });
  } catch (error) {
    console.error("❌ Firestore write failed:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

module.exports = { submitConcern };
