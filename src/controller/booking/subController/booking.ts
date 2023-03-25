const Booking = require('../../../models/booking.model');
const Vehicle = require('../../../models/vehicle.model');
import { Request, Response, NextFunction } from "express";

async function createBooking(req: Request, res: Response) {

  const { startDate, endDate, vehicleId, userId } = req.body;

  try {
    // Check if the vehicle is available during the booking period
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle.available) {
      return res.status(400).json({ message: 'Vehicle is not available for the selected dates.' });
    }

    // Create a new booking
    const booking = new Booking({
      startDate,
      endDate,
      vehicleId: vehicleId,
      userId: userId,
    });

    // Save the booking to the database
    await booking.save();

    // Update the availability status of the vehicle
    vehicle.available = false;
    await vehicle.save();

    return res.status(201).json({ message: 'Booking created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  createBooking
};

