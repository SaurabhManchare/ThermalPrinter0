const express = require('express');
const router = express.Router();
const {
  createBillPrint,
  getBillPrints,
  getBillPrintById,
  updateBillPrint,
  deleteBillPrint
} = require('../controller/BillPrintController');

// POST /billprints - Create a new BillPrint
router.post('/billprints', createBillPrint);

// GET /billprints - Get all BillPrints
router.get('/billprints', getBillPrints);

// GET /billprints/:id - Get a single BillPrint by ID
router.get('/billprints/:id', getBillPrintById);

// PUT /billprints/:id - Update a BillPrint by ID
router.put('/billprints/:id', updateBillPrint);

// DELETE /billprints/:id - Delete a BillPrint by ID
router.delete('/billprints/:id', deleteBillPrint);

module.exports = router;
