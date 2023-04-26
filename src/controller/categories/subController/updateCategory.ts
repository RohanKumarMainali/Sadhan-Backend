import { Request, Response, NextFunction } from "express";

const categoryModel = require("../../../models/category.model");
const cloudinary = require("../../../utils/cloudinary");

const updateCategory = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updateInfo = req.body;
  try {
    if (id == undefined)
      return res
        .status(400)
        .send({ success: false, message: "Please provide valid category id!" });

    // category Image

    if (req?.files?.image) {
      const imageResponse = await cloudinary.uploader.upload(
        req.files.image?.tempFilePath,
        { folder: "category_image" },
        function (err: any, success: any) {
          if (err) {
            console.log(err);
          }
        }
      );
      updateInfo.image = {
        public_id: imageResponse.public_id,
        url: imageResponse.secure_url,
      };
    }

    console.log(updateInfo);
    const response = await categoryModel.findByIdAndUpdate(id, updateInfo);
    await response.save();

    return res.status(200).send({ message: "category updated successfully!" });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

module.exports = updateCategory;
