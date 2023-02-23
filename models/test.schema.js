const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = Schema({
  testNo: Number,
  questions: [
    {
      qId: Number,
      question: String,
      choices: [String],
      answer: String,
      score: Number,
    },
  ],
});

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
