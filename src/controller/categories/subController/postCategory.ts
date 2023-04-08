const categoryModel = require("../../../models/category.model");
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const cloudinary = require("../../../utils/cloudinary");
const slugify = require('slugify')

interface imageType {
  public_id: string;
  url: string;
}
const postCategory = async (req: any, res: Response, next: NextFunction) => {
  const categoryObj : any = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  try {
    const image = req.files.insuranceImage;

    const imageResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      { folder: "category_image" },
      function (err: any, success: any) {
        if (err) {
          console.log(err);
        }
        if(success){
          categoryObj.image.public_id = imageResponse.public_id
          categoryObj.image.url= imageResponse.secure_url
        }
      }
    );

    // post vehicle logic

    const response = await new categoryModel(categoryObj);

    await response.save();
    return res
      .status(201)
      .send({
        success: true,
        message: "Category posted successfully!",
        response,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = postCategory;
