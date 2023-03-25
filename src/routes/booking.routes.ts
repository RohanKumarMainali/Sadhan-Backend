const bookingRoute = require('express').Router()

const {createBooking} = require('../controller/index.controllers').bookingControllers;


bookingRoute.post('/bookVehicle',createBooking);

module.exports = bookingRoute;
