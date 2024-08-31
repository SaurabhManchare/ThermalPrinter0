const mongoose = require('mongoose');

const BillPrintSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    order: {
        type: String,
        required: true,
    },
    total_price: {
        type: String,
        required: true,
    },
});

const BillPrintData = mongoose.model('BillPrintData', BillPrintSchema);

module.exports = BillPrintData;
