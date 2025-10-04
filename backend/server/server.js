// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env.development"),
});

// --- ROUTES ---
const authRoutes = require("../routes/auth-routes");
const concernsRoutes = require("../routes/concerns-routes");
const imageRoutes = require("../routes/image-routes");

// --- EXPRESS SETUP ---
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// --- FIREBASE ADMIN SETUP ---
const serviceAccountPath = path.resolve(
  __dirname,
  "../riskwise-64d40-firebase-adminsdk-fbsvc-084fc0457a.json"
);

// Read and parse service account JSON
const serviceAccountJSON = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(serviceAccountJSON);

// Fix private key formatting
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
console.log("✅ Firebase Admin initialized");
console.log("Project ID:", serviceAccount.project_id);

// --- ROUTES (after Firebase setup) ---
app.use("/", authRoutes);
app.use("/", concernsRoutes);
app.use("/", imageRoutes);

// --- TEST FIRESTORE ROUTE ---
// app.get("/firestore-test", async (req, res) => {
//   try {
//     const docRef = db.collection("test").doc("ping");
//     await docRef.set({ timestamp: new Date().toISOString() });
//     res.send("✅ Firestore write successful");
//   } catch (err) {
//     console.error("Firestore test error:", err);
//     res.status(500).send(err.message);
//   }
// });

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { db, admin };
