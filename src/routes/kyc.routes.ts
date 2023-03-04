const kycRouter = require('express').Router();

const { verifyPhoneNumber, verifyEmail, sendEmailOTP, postKYC } = require('../controller/kyc/index.controller')


kycRouter.post('/verifyPhoneNumber', verifyPhoneNumber)
kycRouter.post('/verifyEmail', verifyEmail)
kycRouter.post('/sendEmailOTP', sendEmailOTP)
kycRouter.put('/postKYC', postKYC)

module.exports = kycRouter
