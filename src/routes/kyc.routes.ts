const kycRouter = require('express').Router();

const { verifyPhoneNumber, verifyEmail, sendEmailOTP } = require('../controller/kyc/index.controller')


kycRouter.post('/verifyPhoneNumber', verifyPhoneNumber)
kycRouter.post('/verifyEmail', verifyEmail)
kycRouter.post('/sendEmailOTP', sendEmailOTP)

module.exports = kycRouter
