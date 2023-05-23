
import mongoose from 'mongoose'
const User = require('./user.model')

const vehicleModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: User},
    ownerName: String,
    ownerEmail:String,
    name: String,
    price: String,
    model: String,
    milage: String,
    seat: String,
    carImages: Array,
    vehicleNumber: { unique: true, type: String, required: true },
    location: String,
    description: String,
    categoryId: String,
    categoryName: String,
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

{ /*
vehicleModel.pre('save', function (next) {
  const self = this;
  mongoose.models['vehicles'].findOne({ vehicleNumber: self.vehicleNumber }, function (err: any, vehicle:any) {
    if (err) {
      next(err);
    } else if (vehicle) {
      // A vehicle with the same vehicle number already exists
      self.invalidate('vehicleNumber', 'Vehicle number must be unique.');
      next(new Error('Vehicle number must be unique.'));
    } else {
      next();
    }
  });
});
*/}

module.exports =  mongoose.model("vehicles",vehicleModel)
