
const router = require('express').Router()

const {login,signup} = require('../controller/index.controllers').adminControllers;
//testing roman branch

router.post('/admin/login',login);

module.exports = router;