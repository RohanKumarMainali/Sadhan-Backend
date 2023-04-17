const POST_VEHICLE = require("./subController/postVehicle");
const GET_VEHICLE = require("./subController/getVehicle");
const DELETE_VEHICLE = require("./subController/deleteVehicle");
const UPDATE_VEHICLE = require("./subController/updateVehicle");
const GET_VEHICLE_BY_USER = require("./subController/getVehicleByUser");

module.exports = {
  updateVehicle: UPDATE_VEHICLE,
  postVehicle: POST_VEHICLE,
  getVehicleByUser: GET_VEHICLE_BY_USER,
  getVehicle: GET_VEHICLE,
  deleteVehicle: DELETE_VEHICLE,
};
