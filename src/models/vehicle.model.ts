
import mongoose from 'mongoose'
const User = require('./user.model')

const vehicleModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: User},
    name: String,
    price: String,
    model: String,
    milage: String,
    seat: String,
    carImages: Array,
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
    status: String,
    available: {type: Boolean},
    createdOn: Date,
}) 

module.exports =  mongoose.model("vehicles",vehicleModel)
