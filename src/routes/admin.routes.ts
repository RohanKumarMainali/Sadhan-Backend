
const router = require('express').Router()

// const login = require('../controller/index.controllers').adminControllers.LOGIN;
// const Signup = require('../controller/index.controllers').adminControllers.SIGNUP;
const {login,signup} = require('../controller/index.controllers').adminControllers;
//testing roman branch

router.post('/admin/login',login);

module.exports = router;