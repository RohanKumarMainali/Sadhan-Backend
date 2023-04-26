const reviewModel = require('../../../models/review.model')
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const cloudinary = require("../../../utils/cloudinary");
import slugify from 'slugify'

interface imageType {
  public_id: string;
  url: string;
}
const postReview = async (req: any, res: Response, next: NextFunction) => {
    console.log('postCategory')
  const categoryObj: any = {
    userId : req.body.userId,
    vehicleId : req.body.vehicleId,
    userName: req.body.userName,
    review: req.body.review,
    rating: req.body.rating,
    image: { public_id: "", url: "" },
    createdOn: new Date().toString(),
  };


  try {

    // post review logic

    const response = await new reviewModel(categoryObj);

    await response.save();
    return res.status(201).send({
      success: true,
      message: "Review posted successfully!",
      response,
    });
  } catch (error) {
    next(error);
  }
 
};

module.exports = postReview;
