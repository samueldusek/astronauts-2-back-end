const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  astronauts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Astronaut",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
