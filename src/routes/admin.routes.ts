
const router = require('express').Router()

const {login,signup, getDashboardData, getOwnerDashboardData} = require('../controller/index.controllers').adminControllers;
//testing roman branch

router.post('/admin/login',login);
router.post('/admin/signup',signup);
router.get('/admin/getDashboardData',getDashboardData);
router.get('/getOwnerDashboardData/:id',getOwnerDashboardData);

module.exports = router;
