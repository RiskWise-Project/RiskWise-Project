// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env.development"),
});

// Routes
const authRoutes = require("../routes/auth-routes");
const concernsRoutes = require("../routes/concerns-routes");
const imageRoutes = require("../routes/image-routes");

// Firebase (import from helper only)
const { db, admin } = require("../helper/firebase"); // <- only import here

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/", authRoutes);
app.use("/", concernsRoutes);
app.use("/", imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
