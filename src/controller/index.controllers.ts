const controllers = {

    adminControllers: require("./admin/index.controller"),
    userControllers: require("./user/index.controller"),
    vehicleControllers: require('./vehicle/index.controller'),
    khaltiCotrollers: require('./khalti/index.controller'),
    kycControllers: require('./kyc/index.controller'),
    bookingControllers: require('./booking/index.controller'),
    transactionControllers: require('./transaction/index.controller'),
    categoryControllers: require('./categories/index.controller'),
    reviewControllers: require('./review/index.controller'),
    searchControllers: require('./search/index.controller')
}

module.exports = controllers;
