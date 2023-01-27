
import mongoose from 'mongoose'

const vehicleModel = new mongoose.Schema({
    
    name: String,
    price: String,
    model: String,
    milage: String,
    seat: String,
    image: String,
    vehicleNumber: String,
    location: String,
    description: String,
    category: String,
    review: String,
    blueBookImage: String,
    insuranceImage: String,
    status: Boolean,
    createdOn: Date,
}) 

module.exports =  mongoose.model("vehicles",vehicleModel)
