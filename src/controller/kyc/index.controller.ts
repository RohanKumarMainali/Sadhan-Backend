
const VERIFY_PHONE_NUMBER = require('./subController/verifyPhoneNumber')
const VERIFY_EMAIL = require('./subController/verifyEmail').verifyEmail
const SEND_EMAIL_OTP = require('./subController/verifyEmail').sendEmailOTP
module.exports = { verifyPhoneNumber: VERIFY_PHONE_NUMBER, verifyEmail: VERIFY_EMAIL, sendEmailOTP: SEND_EMAIL_OTP }
