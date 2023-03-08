const kycRouter = require('express').Router();

const { verifyPhoneNumber, verifyEmail, sendEmailOTP, postKYC ,viewKycRequest,approveKyc} = require('../controller/kyc/index.controller')

kycRouter.post('/verifyPhoneNumber', verifyPhoneNumber)
kycRouter.post('/verifyEmail', verifyEmail)
kycRouter.post('/sendEmailOTP', sendEmailOTP)
kycRouter.put('/postKYC', postKYC)
kycRouter.post('/verifyKyc', approveKyc)
kycRouter.get('/getKycRequest', viewKycRequest)

module.exports = kycRouter
