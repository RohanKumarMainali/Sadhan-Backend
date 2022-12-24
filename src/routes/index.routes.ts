const Router = require('express').Router();


// Import user defined routes

const ADMIN_ROUTES = require('./admin.routes');
const USER_ROUTES = require('./user.routes');

Router.use(ADMIN_ROUTES);
Router.use(USER_ROUTES);

module.exports = Router;
