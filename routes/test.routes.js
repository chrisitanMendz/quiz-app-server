const express = require("express");

const Test = require("../models/test.schema");
const User = require("../models/user.schema");
const testRoutes = express.Router();

testRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const test = await Test.findOne({ testNo: id });
    if (!test) {
      throw new Error("Test not found!");
    }

    const removeTAns = test.questions.map((item) => {
      item.answer = "";
      return item;
    });

    test.questions = removeTAns;

    res.json(test);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

testRoutes.post("/verifyAnswer/:id", async (req, res) => {
  const testNo = req.params.id;
  const { data, email } = req.body;
  let score = 0;
  let correct = 0;

  const test = await Test.findOne({ testNo });
  test.questions.map((item, index) => {
    if (item.id == data.myAnswers[index].questionNo && item.answer == data.myAnswers[index].answer) {
      score += item.score;
      correct++;
    }
  });

  const user = await User.findOne({ email });
  user.tests.push({
    testNo,
    score,
    correct,
  });
  user.save();

  res.json({ score, correct });
});

module.exports = testRoutes;
