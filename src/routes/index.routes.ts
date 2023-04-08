const Router = require('express').Router();


// Import user defined routes

const ADMIN_ROUTES = require('./admin.routes');
const USER_ROUTES = require('./user.routes');
const VEHICLE_ROUTES = require('./vehicle.routes')
const KYC_ROUTES = require('./kyc.routes')
const KHALTI_ROUTES = require('./khalti.routes')
const BOOKING_ROUTES = require('./booking.routes')
const TRANSACTION_ROUTES = require('./transaction.routes')
const SEARCH_ROUTES = require('./search.routes')
const CATEGORY_ROUTES = require('./category.routes')

Router.use(ADMIN_ROUTES);
Router.use(USER_ROUTES);
Router.use(VEHICLE_ROUTES);
Router.use(KYC_ROUTES)
Router.use(KHALTI_ROUTES)
Router.use(BOOKING_ROUTES)
Router.use(TRANSACTION_ROUTES)
Router.use(SEARCH_ROUTES)
Router.use(CATEGORY_ROUTES)

module.exports = Router;
