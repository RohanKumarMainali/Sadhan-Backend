const Router = require('express').Router();


// Import user defined routes

const ADMIN_ROUTES = require('./admin.routes');
const USER_ROUTES = require('./user.routes');
const VEHICLE_ROUTES = require('./vehicle.routes')
const KYC_ROUTES = require('./kyc.routes')
const KHALTI_ROUTES = require('./khalti.routes')

Router.use(ADMIN_ROUTES);
Router.use(USER_ROUTES);
Router.use(VEHICLE_ROUTES);
Router.use(KYC_ROUTES)
Router.use(KHALTI_ROUTES)

module.exports = Router;
