const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("./dbConnection");

const Routes = require("./routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Routes.initRoutes(app);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
