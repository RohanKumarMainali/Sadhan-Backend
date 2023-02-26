const kycRouter = require('express').Router();

const { verifyPhoneNumber } = require('../controller/kyc/index.controller')


kycRouter.post('/verifyPhoneNumber', verifyPhoneNumber)

module.exports = kycRouter
