const mongoose = require("mongoose");

const astronauts = require("./astronauts");

const Astronaut = require("../models/astronauts");

mongoose.connect("mongodb://localhost:27017/astronauts-2-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDb = async () => {
  for (i = 0; i < astronauts.length; i++) {
    const newAstronaut = new Astronaut(astronauts[i]);
    await newAstronaut.save();
  }
};

seedDb().then(() => {
  db.close();
});
