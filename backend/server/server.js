const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: ".env.development" });
const cors = require("cors");
const compression = require("compression");

const AuthRoutes = require("../routes/auth-routes");
const ConcernRoutes = require("../routes/concerns-routes");

app.use(cors());
app.use(express.json());

app.use("/", ConcernRoutes);
app.use("/auth", AuthRoutes);

app.use(compression());
app.use(express.static(path.resolve(__dirname, "dist")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
