import { NextFunction, Request, Response } from "express";
const Vehicle = require("../../../models/vehicle.model");
const Booking = require("../../../models/booking.model");

const getOwnerDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    if (userId) {
      let bookingCount = await Booking.countDocuments({ userId: userId });
      let rentalCount = await Booking.countDocuments({ ownerId: userId });
      let vehicleCount = await Vehicle.countDocuments({ userId: userId });
      return res.status(200).send({ bookingCount: bookingCount, rentalCount: rentalCount, vehicleCount: vehicleCount});
    }
  } catch (error) {
      next(error)
  }
};

module.exports = getOwnerDashboardData;
