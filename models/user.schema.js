const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tests: [
    {
      testNo: {
        type: Number,
        required: true,
      },
      correct: {
        type: Number,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
