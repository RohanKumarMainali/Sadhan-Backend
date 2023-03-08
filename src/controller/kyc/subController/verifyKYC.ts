const userModel = require("../../../models/user.model");
import { NextFunction, Request, Response } from "express";
const cloudinary = require("../../../utils/cloudinary");
interface imageType {
  public_id: string;
  url: string;
}
const postKYC = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const kycForm = req.body;

  try {
    // image -- process

    const citizenshipImageFront = req.files.citizenshipImageFront;
    const citizenshipImageBack = req.files.citizenshipImageBack;
    const drivingLicenseImage = req.files.drivingLicenseImage;
    const citizenshipImageFrontResponse = await cloudinary.uploader.upload(
      citizenshipImageFront.tempFilePath,
      { folder: "citizenship_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );

    const citizenshipImageBackResponse = await cloudinary.uploader.upload(
      citizenshipImageBack.tempFilePath,
      { folder: "citizenship_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );

    const drivingLicenseImageResponse = await cloudinary.uploader.upload(
      drivingLicenseImage.tempFilePath,
      { folder: "driving_license_images" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
      }
    );

    // update kyc details in user model

    const response = await userModel.findByIdAndUpdate(id, {
      status: "pending",
      kyc: {
        kycFormData: kycForm,
        citizenshipImageFront: {
          public_id: citizenshipImageFrontResponse.public_id,
          url: citizenshipImageFrontResponse.secure_url,
        },
        citizenshipImageBack: {
          public_id: citizenshipImageBackResponse.public_id,
          url: citizenshipImageBackResponse.secure_url,
        },

        drivingLicenseImage: {
          public_id: drivingLicenseImageResponse.public_id,
          url: drivingLicenseImageResponse.secure_url,
        },
      },
    });

    await response.save();
    return res.status(201).send({
      success: true,
      message: "KYC form posted successfully!",
      response,
    });
  } catch (error) {
    next(error);
  }
};

const approveKyc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const response = await userModel.findByIdAndUpdate(id, {
      status: "verified",
    });
    return res
      .status(200)
      .send({ success: true, message: "User verified successfully! " });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

const viewKycRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    // get all user with status pending i.e their kyc needs to be checked
    const response = await userModel.find({ status: { $eq: "pending" } });
    console.log(response)
    return res
      .status(200)
      .send({ data: response});
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { postKYC, approveKyc , viewKycRequest};
