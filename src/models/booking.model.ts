import mongoose from 'mongoose'
const Vehicle = require('./vehicle.model')
const User = require('./user.model')

const bookingSchema = new mongoose.Schema({
    vehicleId : {type: mongoose.Schema.Types.ObjectId, ref: Vehicle},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: User},
    status: {type: String, required: true},
    amount: {type: Number, required: true},
    startDate : {type: Date, required: true},
    endDate : {type: Date, required: true},
    createdOn : {type: Date, required: true},
})

module.exports = mongoose.model('booking', bookingSchema)
