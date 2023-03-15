
const khaltiRouter = require('express').Router();

const {verifyKhalti} = require('../controller/khalti/index.controller');

khaltiRouter.get('/khalti/verify/:token/:amount',verifyKhalti)

module.exports = khaltiRouter;
