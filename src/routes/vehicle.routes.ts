
const vehicleRoute = require('express').Router();
const postVehicle = require('../controller/vehicle/index.controller.ts').postVehicle
const getVehicle = require('../controller/vehicle/index.controller.ts').getVehicle
const deleteVehicle = require('../controller/vehicle/index.controller.ts').deleteVehicle
const updateVehicle = require('../controller/vehicle/index.controller.ts').updateVehicle
const auth = require('../middleware/auth')

vehicleRoute.post('/postVehicle',auth.VERIFY_JWT, postVehicle)
vehicleRoute.get('/getVehicle', getVehicle)
vehicleRoute.get('/getVehicle/:id', getVehicle)
vehicleRoute.delete('/deleteVehicle/:id', deleteVehicle)
vehicleRoute.put('/updateVehicle/:id', updateVehicle)


module.exports = vehicleRoute
