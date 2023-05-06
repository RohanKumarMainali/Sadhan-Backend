const userModel = require("../../../models/user.model");
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const cloudinary = require("../../../utils/cloudinary");

interface imageType {
  public_id: string;
  url: string;
}
const postProfilePicture = async (req: any, res: Response, next: NextFunction) => {
  const profileObj: any = {
    image: { public_id: "", url: "" },
  };

  try {
    const image = req.files.image;
    const id = req.body.id;

    console.log(image)

    const imageResponse = await cloudinary.uploader.upload(
      image?.tempFilePath,
      { folder: "profile_image" },
      function (err: any, success: any) {
        if (err) {
          console.log("Error " + err);
        }
      }
    );

    profileObj.image.public_id = imageResponse.public_id;
    profileObj.image.url = imageResponse.secure_url;

    // post profilePicture logic
    const response = await userModel.findByIdAndUpdate(id, profileObj);
    await response.save();
    return res.status(201).send({
      success: true,
      message: "Profile picture uploaded successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postProfilePicture;
