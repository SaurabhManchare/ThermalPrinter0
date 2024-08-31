const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const dbconnect = require("./Config/Database")
const BillPrintData = require("./router/BillPrintRouter");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Database Connect

dbconnect();

app.get("/", (req, res) => {
  res.render("Home.ejs");
});

// Printer Router

app.use("/api", BillPrintData);

app.listen(process.env.port, () => {
  console.log(` Printer Server listening on ${process.env.port}`);
});
