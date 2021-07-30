require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/astronauts-2-db";
const port = process.env.PORT || 3000;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const astronautsRoutes = require("./routes/astronauts");
app.use("/api/astronauts", astronautsRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("The app is listening on port 3000.");
});
