const LOGIN = require('./subController/Login');
const SIGNUP = require('./subController/Signup');
const GET_DASHBOARD_DATA = require('./subController/getDashboardData');
const GET_OWNER_DASHBORAD_DATA = require('./subController/getOwnerDashboardData');

// const SIGNUP = require('./subController/Signup')


module.exports = {login: LOGIN,signup: SIGNUP, getDashboardData: GET_DASHBOARD_DATA, getOwnerDashboardData: GET_OWNER_DASHBORAD_DATA};
