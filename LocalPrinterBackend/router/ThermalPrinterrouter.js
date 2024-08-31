const express = require("express");
const router = express.Router();
const printReceipt = require("../controller/ThermalPrinterController");

router.post("/print", (req, res) => {
  const restaurantData = req.body;
  printReceipt(restaurantData)
    .then(() => res.status(200).send("Print successful"))
    .catch((error) => res.status(500).send("Print failed: " + error));
});

module.exports = router;
