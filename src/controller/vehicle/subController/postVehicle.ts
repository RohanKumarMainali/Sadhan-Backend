const vehicleModel = require("../../../models/vehicle.model");
import { NextFunction, Request, Response } from "express";
const cloudinary = require("../../../utils/cloudinary");

const postVehicle = async (req: any, res: Response, next: NextFunction) => {
  const {
    ownerId,
    name,
    seat,
    price,
    location,
    description,
    milage,
    model,
    vehicleNumber,
  } = req.body;

  try {
    // image -- process
    const image = req?.files?.image;
    console.log(req.files);
    console.log("image" + image);
    const insuranceImage = req.files.insuranceImage;
    const bluebookImage = req.files.bluebookImage;
    const carImageResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      { folder: "car_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );
    const insuranceImageResponse = await cloudinary.uploader.upload(
      bluebookImage.tempFilePath,
      { folder: "bluebook_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );
    const bluebookImageResponse = await cloudinary.uploader.upload(
      insuranceImage.tempFilePath,
      { folder: "insurance_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );
    // post vehicle logic

    const response = await new vehicleModel({
      ownerId,
      name,
      price,
      milage,
      seat,
      model,
      vehicleNumber,
      location,
      description,
      status: false,
      createdOn: new Date().toString(),
      image: {
        public_id: carImageResponse.public_id,
        url: carImageResponse.secure_url,
      },
      insuranceImage: {
        public_id: insuranceImageResponse.public_id,
        url: insuranceImageResponse.secure_url,
      },
      bluebookImage: {
        public_id: bluebookImageResponse.public_id,
        url: bluebookImageResponse.secure_url,
      },
    });

    await response.save();
    return res
      .status(200)
      .send({ success: true, message: "Vehicle posted successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = postVehicle;
