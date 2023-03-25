const controllers = {
    adminControllers: require("./admin/index.controller"),
    userControllers: require("./user/index.controller"),
    vehicleControllers: require('./vehicle/index.controller'),
    khaltiCotrollers: require('./khalti/index.controller'),
    kycControllers: require('./kyc/index.controller'),
    bookingController: require('./booking/index.controller')
}

module.exports = controllers;
