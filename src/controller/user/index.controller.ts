const userLogin = require('./subController/Login');
const userSignup = require('./subController/Signup');
const FORGOT_PASSWORD = require('./subController/forgotPassword');
const CHANGE_PASSWORD = require('./subController/changePassword')
const FORGOT_PASSWORD_EMAIL = require('./subController/forgotPasswordEmail');

// const SIGNUP = require('./subController/Signup')


module.exports = {login: userLogin,signup: userSignup, forgotPassword: FORGOT_PASSWORD, forgotPasswordEmail: FORGOT_PASSWORD_EMAIL, changePassword : CHANGE_PASSWORD};
