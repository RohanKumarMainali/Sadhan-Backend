
const vehicleRoute = require('express').Router();
const postVehicle = require('../controller/vehicle/index.controller.ts').postVehicle
const getVehicle = require('../controller/vehicle/index.controller.ts').getVehicle
const deleteVehicle = require('../controller/vehicle/index.controller.ts').deleteVehicle

vehicleRoute.post('/postVehicle',postVehicle)
vehicleRoute.get('/getVehicle',getVehicle)
vehicleRoute.delete('/deleteVehicle/:id',deleteVehicle)


module.exports = vehicleRoute
