require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () =>{

    try {
        const response = await mongoose.connect(process.env.MONGO_URI );
        console.log("Database connected");
        return "Database connected";

    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    }    

}
module.exports = connectDB;