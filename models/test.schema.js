const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = Schema({
  testNo: {
    type: Number,
    unique: true,
  },
  questions: [
    {
      id: {
        type: String,
        unique: true,
      },
      questions: String,
      choices: [String],
      answer: String,
      score: Number,
    },
  ],
});

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
