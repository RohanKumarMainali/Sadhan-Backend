const vehicleModel = require("../../../models/vehicle.model");
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const cloudinary = require("../../../utils/cloudinary");

interface imageType {
  public_id: string;
  url: string;
}
const postVehicle = async (req: any, res: Response, next: NextFunction) => {
  const {
    userId,
    ownerEmail,
    ownerName,
    name,
    seat,
    price,
    location,
    description,
    milage,
    model,
    vehicleNumber,
    categoryId,
    categoryName,
  } = req.body;


  try {
    // image -- process
    const images = req?.files?.image;
    const insuranceImage = req.files.insuranceImage;
    const bluebookImage = req.files.bluebookImage;

    // for multiple images
    let results: any;
    try {
      let uploadPromises: Promise<any>[];
      if (Array.isArray(images)) {
        uploadPromises = images.map(async (image: any) => {
          const result = await cloudinary.uploader.upload(
            image.tempFilePath,
            { folder: "car_images" },
            function (err: any, success: any) {
              if (err) {
                console.log(err);
              }
            }
          );
          return { public_id: result.public_id, url: result.secure_url };
        });
      } else {
        uploadPromises = [
          cloudinary.uploader
            .upload(
              images.tempFilePath,
              { folder: "car_images" },
              function (err: any, success: any) {
                if (err) {
                  console.log(err);
                }
              }
            )
            .then((result: any) => ({
              public_id: result.public_id,
              url: result.secure_url,
            })),
        ];
      }
      results = await Promise.all(uploadPromises);
    } catch (error: any) {
      console.log(error);
    }

    const insuranceImageResponse = await cloudinary.uploader.upload(
      insuranceImage.tempFilePath,
      { folder: "bluebook_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );
    const bluebookImageResponse = await cloudinary.uploader.upload(
      bluebookImage.tempFilePath,
      { folder: "insurance_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );

    // post vehicle logic

    const response = await new vehicleModel({
      userId: new mongoose.Types.ObjectId(userId),
      name,
      price,
      ownerEmail: ownerEmail,
      ownerName: ownerName,
      milage,
      seat,
      model,
      vehicleNumber,
      location,
      description,
      categoryId,
      categoryName,
      available: true,
      createdOn: new Date().toString(),
      carImages: results,
      insuranceImage: {
        public_id: insuranceImageResponse.public_id,
        url: insuranceImageResponse.secure_url,
      },
      bluebookImage: {
        public_id: bluebookImageResponse.public_id,
        url: bluebookImageResponse.secure_url,
      },
      status: "pending",
    });

    await response.save();
    return res.status(201).send({
      success: true,
      message: "Vehicle posted successfully!",
      response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postVehicle;
