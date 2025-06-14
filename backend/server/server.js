const express = require("express");
const app = express();
require("dotenv").config({ path: ".env.development" });
const ConcernRoutes = require("../routes/concerns-routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", ConcernRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
