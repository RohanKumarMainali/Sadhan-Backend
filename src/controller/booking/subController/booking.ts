const Booking = require('../../../models/booking.model');
const Vehicle = require('../../../models/vehicle.model');
import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'
import moment from 'moment'

const CREATE_BOOKING = async(req: Request, res: Response) => {

  const { startDate, endDate, vehicleId, userId , amount} = req.body;

  try {
    // Check if the vehicle is available during the booking period
    const vehicle = await Vehicle.findById(vehicleId);
    
    // if vehicle is available that means it has not been booked till now

    if (!vehicle.available) {

    // check for booking conflicts

    const bookings = await Booking.find({vehicleId: vehicleId});
    const conflict = bookings.some((booking: any)=>{
        const start = booking.startDate;
        const end = booking.endDate;
        return(
        (moment(startDate).isSameOrAfter(start) && moment(startDate).isBefore(end)) ||
        (moment(endDate).isSameOrBefore(end) && moment(endDate).isAfter(start))
        )
    }) 
    
    if (conflict) {
      return res.status(400).json({ message: 'Booking conflicts with existing bookings' });
    }

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

