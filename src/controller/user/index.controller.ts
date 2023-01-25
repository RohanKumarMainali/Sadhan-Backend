const userLogin = require('./subController/Login');
const userSignup = require('./subController/Signup');
const FORGOT_PASSWORD = require('./subController/forgotPassword');
const CHANGE_PASSWORD = require('./subController/changePassword')
const FORGOT_PASSWORD_EMAIL = require('./subController/forgotPasswordEmail');
const GET_USER = require('./subController/getUser')

// const SIGNUP = require('./subController/Signup')


module.exports = {login: userLogin,signup: userSignup,getUser: GET_USER, forgotPassword: FORGOT_PASSWORD, forgotPasswordEmail: FORGOT_PASSWORD_EMAIL, changePassword : CHANGE_PASSWORD};
