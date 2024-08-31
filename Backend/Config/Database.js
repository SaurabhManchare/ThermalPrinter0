const mongoose = require('mongoose');

const dbconnect = () => {
    try {
        mongoose.connect(process.env.Mongo_Url, {

        })
       .then(() => console.log("Database connection established"));
    } catch (error) {
        console.log("Database connection error" , error);
    }
}

module.exports = dbconnect;