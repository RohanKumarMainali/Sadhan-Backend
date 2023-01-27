
import mongoose from 'mongoose'

const vehicleModel = new mongoose.Schema({
    ownerId: String,
    name: String,
    price: String,
    model: String,
    milage: String,
    seat: String,
    image: {
        public_id: String,
        url: String
    },
    vehicleNumber: String,
    location: String,
    description: String,
    category: String,
    review: String,
    bluebookImage: {
        public_id: String,
        url: String
    },
    insuranceImage: {
        public_id: String,
        url: String
    },
    status: Boolean,
    createdOn: Date,
}) 

module.exports =  mongoose.model("vehicles",vehicleModel)
