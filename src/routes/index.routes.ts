const Router = require('express').Router();


// Import user defined routes

const ADMIN_ROUTES = require('./admin.routes');

Router.use(ADMIN_ROUTES);

module.exports = Router;
