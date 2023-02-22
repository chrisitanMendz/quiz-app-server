const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.CLUSTER;

mongoose.set("strictQuery", false);
mongoose.connect(URL, (res) => {
  if (res) console.log("error in mongoDB: ", res.codeName);
  else console.log("connected to mongodb");
});
