const BillPrintData = require('../model/BillPrintmodel');

const createBillPrint = async (req, res) => {
  try {
    const newBillPrintId = await BillPrintData.countDocuments();
    const newBillPrintData = {
      ...req.body,
      _id: newBillPrintId + 1 // Set _id directly
    };
    const billPrint = await BillPrintData.create(newBillPrintData);
    res.status(201).json({ success: true, data: billPrint });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getBillPrints = async (req, res) => {
  try {
    const billPrints = await BillPrintData.find();
    res.status(200).json({ success: true, data: billPrints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBillPrintById = async (req, res) => {
  try {
    const billPrint = await BillPrintData.findById(req.params.id);
    if (!billPrint) {
      return res.status(404).json({ success: false, message: 'BillPrint not found' });
    }
    res.status(200).json({ success: true, data: billPrint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateBillPrint = async (req, res) => {
  try {
    const updatedBillPrint = await BillPrintData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBillPrint) {
      return res.status(404).json({ success: false, message: 'BillPrint not found' });
    }
    res.status(200).json({ success: true, data: updatedBillPrint });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteBillPrint = async (req, res) => {
  try {
    const deletedBillPrint = await BillPrintData.findByIdAndDelete(req.params.id);
    if (!deletedBillPrint) {
      return res.status(404).json({ success: false, message: 'BillPrint not found' });
    }
    res.status(200).json({ success: true, message: 'BillPrint deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createBillPrint,
  getBillPrints,
  getBillPrintById,
  updateBillPrint,
  deleteBillPrint
};
