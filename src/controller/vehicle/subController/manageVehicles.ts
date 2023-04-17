const vehicleModel = require("../../../models/vehicle.model");
import { NextFunction, Request, Response } from "express";
const cloudinary = require("../../../utils/cloudinary");
interface imageType {
  public_id: string;
  url: string;
}

const approveVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const response = await vehicleModel.findByIdAndUpdate(id, {
      status: "verified",
    });
    return res
      .status(200)
      .send({ success: true, message: "Vehicle verified successfully! " });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

const rejectVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const response = await vehicleModel.findByIdAndUpdate(id, {
      status: "rejected",
    });
    return res
      .status(200)
      .send({ success: true, message: "Vehicle is rejected by admin successfully! " });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};



const vehicleRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    // get all vehicle with status pending i.e their kyc needs to be checked
    const response = await vehicleModel.find({ status: { $eq: "pending" } });
    console.log(response)
    return res
      .status(200)
      .send({ data: response});
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};


const viewAllVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // get all vehicle which are in rejected or verified state 
    const response = await vehicleModel.find({ $or:[ {status: "rejected"}, {status: "verified"}]});
    console.log(response)
    return res
      .status(200)
      .send({ data: response});
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {approveVehicle, rejectVehicle, vehicleRequest, viewAllVehicle}
