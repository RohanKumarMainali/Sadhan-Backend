
const vehicleRoute = require('express').Router();
const postVehicle = require('../controller/vehicle/index.controller.ts').postVehicle

vehicleRoute.post('/postVehicle',postVehicle)


module.exports = vehicleRoute
