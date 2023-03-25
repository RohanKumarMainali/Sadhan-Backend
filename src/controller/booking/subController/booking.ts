const Booking = require('../../../models/booking.model');
const Vehicle = require('../../../models/vehicle.model');
import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'

const CREATE_BOOKING = async(req: Request, res: Response) => {

  const { startDate, endDate, vehicleId, userId , amount} = req.body;

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
      status: 'completed',
      amount: parseInt(amount),
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
      userId: new mongoose.Types.ObjectId(userId),
      createdOn: new Date().toString(), 
    });

    // Save the booking to the database
    await booking.save();

    // Update the availability status of the vehicle
    vehicle.available = false;
    await vehicle.save();

    return res.status(201).json({ message: 'Booking created successfully.', bookingDetail: booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = CREATE_BOOKING;

