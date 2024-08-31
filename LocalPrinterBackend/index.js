const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const printerRoutes = require("./router/ThermalPrinterrouter");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("Home.ejs");
});

// Printer Router

app.use("/api", printerRoutes);

app.listen(process.env.port, () => {
  console.log(` Printer Server listening on ${process.env.port}`);
});
