
const vehicleRoute = require('express').Router();
const postVehicle = require('../controller/vehicle/index.controller.ts').postVehicle
const getVehicle = require('../controller/vehicle/index.controller.ts').getVehicle
const deleteVehicle = require('../controller/vehicle/index.controller.ts').deleteVehicle
const updateVehicle = require('../controller/vehicle/index.controller.ts').updateVehicle
const getVehicleByUser = require('../controller/vehicle/index.controller.ts').getVehicleByUser

// manage

const { approveVehicle, rejectVehicle, vehicleRequest, viewAllVehicle} = require('../controller/vehicle/subController/manageVehicles')

const auth = require('../middleware/auth')

vehicleRoute.post('/postVehicle', postVehicle)
vehicleRoute.get('/getVehicle', getVehicle)
vehicleRoute.get('/getVehicleByUser/:userId', getVehicleByUser)
vehicleRoute.get('/getVehicle/:id', getVehicle)
vehicleRoute.delete('/deleteVehicle/:id', deleteVehicle)
vehicleRoute.put('/updateVehicle/:id', updateVehicle)


vehicleRoute.post('/approveVehicle', approveVehicle)
vehicleRoute.post('/rejectVehicle', rejectVehicle)
vehicleRoute.get('/vehicleRequest', vehicleRequest)
vehicleRoute.get('/viewAllVehicle', viewAllVehicle)

module.exports = vehicleRoute
