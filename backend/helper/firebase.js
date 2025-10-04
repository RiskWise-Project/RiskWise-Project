const admin = require("firebase-admin");
const serviceAccount = require("../riskwise-64d40-firebase-adminsdk-fbsvc-084fc0457a.json"); // adjust path as needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://riskwise-64d40.firebaseio.com",
  });
}

const db = admin.firestore();
module.exports = { db, admin };
