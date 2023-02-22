const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user.schema");
const authRoutes = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Password was incorrect!" });
    }
    const userWithourPassword = await User.findOne({ email }).select(
      "-password"
    );
    res.json({
      user: userWithourPassword,
      accessToken: generateToken(user._id),
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

authRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      await user.save();

      const userWithoutPass = await User.findOne({ email }).select("-password");
      res.json({
        user: userWithoutPass,
        accessToken: generateToken(userWithoutPass._id),
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = authRoutes;
