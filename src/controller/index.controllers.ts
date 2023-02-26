const controllers = {
    adminControllers: require("./admin/index.controller"),
    userControllers: require("./user/index.controller"),
    vehicleControllers: require('./vehicle/index.controller'),
    kycControllers: require('./kyc/index.controller')
}

module.exports = controllers;
