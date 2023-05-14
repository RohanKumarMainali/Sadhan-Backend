
const vehicleRoute = require('express').Router();
const postVehicle = require('../controller/vehicle/index.controller').postVehicle
const getVehicle = require('../controller/vehicle/index.controller').getVehicle
const deleteVehicle = require('../controller/vehicle/index.controller').deleteVehicle
const updateVehicle = require('../controller/vehicle/index.controller').updateVehicle
const getVehicleByUser = require('../controller/vehicle/index.controller').getVehicleByUser
const getTopRatedVehicle = require('../controller/vehicle/index.controller').getTopRatedVehicle
const getVerifiedVehicles = require('../controller/vehicle/index.controller').getVerifiedVehicles

// manage

const { approveVehicle, rejectVehicle, vehicleRequest, viewAllVehicle} = require('../controller/vehicle/subController/manageVehicles')

const auth = require('../middleware/auth')

vehicleRoute.post('/postVehicle', postVehicle)
vehicleRoute.get('/getVehicle', getVehicle)
vehicleRoute.get('/getTopRatedVehicle', getTopRatedVehicle)
vehicleRoute.get('/getVehicleByUser/:userId', getVehicleByUser)
vehicleRoute.get('/getVerifiedVehicles', getVerifiedVehicles)
vehicleRoute.get('/getVehicle/:id', getVehicle)
vehicleRoute.delete('/deleteVehicle/:id', deleteVehicle)
vehicleRoute.put('/updateVehicle/:id', updateVehicle)


vehicleRoute.post('/approveVehicle', approveVehicle)
vehicleRoute.post('/rejectVehicle', rejectVehicle)
vehicleRoute.get('/vehicleRequest', vehicleRequest)
vehicleRoute.get('/viewAllVehicle', viewAllVehicle)

module.exports = vehicleRoute
