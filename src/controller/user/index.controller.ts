const userLogin = require('./subController/Login');
const userSignup = require('./subController/Signup');

// const SIGNUP = require('./subController/Signup')


module.exports = {login: userLogin,signup: userSignup};
