const { ThermalPrinter, PrinterTypes } = require('node-thermal-printer');
const axios = require('axios');

// Function to print a single receipt
const printReceipt = async (restaurantData) => {
    try {
        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: `tcp://192.168.0.20`,
        });

        printer.clear();

        printer.alignCenter();
        printer.println(restaurantData.name || 'Restaurant Name');
        printer.drawLine();

        printer.setTextDoubleHeight();
        printer.setTextDoubleWidth();
        printer.println(`Order: ${restaurantData.order}`);
        printer.setTextNormal(); 
        printer.println(`Total Price: ${restaurantData.total_price}`);
        printer.drawLine();

        printer.println('Thank you for your order!');
        printer.cut();

        let execute = await printer.execute();
        console.log(`Print done: ${restaurantData.order}`);
        return execute;
    } catch (error) {
        console.error('Error printing:', error);
        throw error;
    }
};

// Function to fetch data, print receipts, and delete data
const fetchAndProcessData = async () => {
    try {
        // Step 1: Fetch data from the API
        const response = await axios.get('http://billtraceprint.billtrace.in/api/billprints');
        const billDataArray = response.data.data;

        if (billDataArray && billDataArray.length > 0) {
            // Step 2: Process each bill data item
            for (const billData of billDataArray) {
                try {
                    // Step 3: Post the data to the second API
                    await axios.post('http://localhost:4000/api/print', {
                        order: billData.order,
                        total_price: billData.total_price
                    });

                    console.log('Post successful:', billData.order);

                    // Step 4: Print the receipt
                    // await printReceipt({
                    //     name: 'Restaurant Name',  // Replace with actual name if available
                    //     order: billData.order,
                    //     total_price: billData.total_price,
                    // });

                    // Step 5: Delete the data from the first API after printing
                    await axios.delete(`http://billtraceprint.billtrace.in/api/billprints/${billData._id}`);
                    console.log(`Deleted bill data with ID: ${billData._id}`);
                } catch (error) {
                    console.error('Error processing bill data:', error);
                }
            }
        } else {
            console.log('No data to process.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to continuously check for new data and print
const startContinuousCheck = (intervalMs) => {
    setInterval(async () => {
        console.log('Checking for new data...');
        await fetchAndProcessData();
    }, intervalMs);
};

// Start checking for new data every second (1000 milliseconds)
startContinuousCheck(1000);

module.exports = printReceipt;
