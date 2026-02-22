const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());
const routes = require("./routes");
app.use(routes);

module.exports = app;
