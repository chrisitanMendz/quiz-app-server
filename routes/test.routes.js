const express = require("express");

const Test = require("../models/test.schema");
const User = require("../models/user.schema");
const testRoutes = express.Router();

testRoutes.get("/start/:id", async (req, res) => {
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

  try {
    const test = await Test.findOne({ testNo });
    test.questions.map((item, index) => {
      if (item.qId == data.myAnswers[index].questionNo && item.answer == data.myAnswers[index].answer) {
        score += item.score;
        correct++;
      }
    });
  } catch (error) {
    return res.json({ error: error.message });
  }

  try {
    const user = await User.findOne({ email });
    const exist = user.tests.some((x) => x.testNo == testNo);
    if (exist) {
      user.tests = user.tests.filter((x) => x.testNo != testNo);
    }
    user.tests.push({
      testNo,
      score,
      correct,
    });
    user.save();
  } catch (error) {
    return res.json({ error: error.message });
  }

  res.json({ score, correct });
});

testRoutes.get("/all", async (req, res) => {
  try {
    const tests = await Test.find({});

    res.json(tests);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// This routes is for adding new question
testRoutes.post("/addquestion", async (req, res) => {
  const newQuestion = {
    testNo: 4,
    questions: [
      {
        qId: 1,
        question: "What is the smallest country in the world?",
        choices: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        answer: "Vatican City",
        score: 25,
      },
      {
        qId: 2,
        question: "What is the highest grossing film of all time?",
        choices: ["Avengers: Endgame", "Titanic", "Avatar", "Star Wars: The Force Awakens"],
        answer: "Avatar",
        score: 30,
      },
      {
        qId: 3,
        question: "What is the largest continent in the world?",
        choices: ["Europe", "South America", "Asia", "Australia"],
        answer: "Asia",
        score: 15,
      },
      {
        qId: 4,
        question: "What is the most populous country in the world?",
        choices: ["India", "United States", "China", "Russia"],
        answer: "China",
        score: 25,
      },
    ],
  };

  try {
    const test = await new Test(newQuestion);
    if (test) {
      test.save();
      res.json(test);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = testRoutes;
