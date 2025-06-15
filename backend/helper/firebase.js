const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64) {
  const decoded = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64,
    "base64"
  ).toString("utf-8");
  serviceAccount = JSON.parse(decoded);
} else {
  const path = require("path");
  serviceAccount = require(path.resolve(
    __dirname,
    "../riskwise-17990-firebase-adminsdk-fbsvc-147830006d.json"
  ));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
