require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(parser.json());

const corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/astronauts-2-db";
const port = process.env.PORT || 3000;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const astronautsRoutes = require("./routes/astronauts");
const usersRoutes = require("./routes/users");

app.use(cors());

app.use("/api/astronauts", astronautsRoutes);
app.use("/api/users", usersRoutes);

app.get("/*", (req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Resource not found.",
    },
  });
});

app.listen(port, () => {
  console.log("The app is listening on port 3000.");
});
