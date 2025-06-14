const { db } = require("../helper/firebase");

const submitConcern = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    const docRef = await db.collection("concerns").add({
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    res
      .status(201)
      .json({ id: docRef.id, message: "Concern submitted successfully" });

    console.log(docRef);
  } catch (error) {
    console.error("Error saving concern:", error);
    res.status(500).json({ error: "Failed to submit concern" });
  }
};

module.exports = {
  submitConcern,
};
