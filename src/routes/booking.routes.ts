const bookingRoute = require('express').Router()

//const {createBooking} = require('../controller/khalti/index.controller');
const {createBooking,getBooking} = require('../controller/index.controllers').bookingControllers;


bookingRoute.post('/bookVehicle',createBooking);
bookingRoute.get('/booking',getBooking);

module.exports = bookingRoute;
