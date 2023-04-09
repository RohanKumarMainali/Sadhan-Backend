import { Request, Response, NextFunction } from "express";
const cloudinary = require("../../../utils/cloudinary");

const categoryModel = require("../../../models/category.model");
const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    if (id == undefined) return res.status(400).send({ success: false, message: 'please provide category id ' });
    try {

        const category = await categoryModel.findOne({ _id: id });
        // destructuring images to delte from cloudinary

        const { image} = category
        const test = await cloudinary.uploader.destroy(image.public_id, function(err: any, success: any) { if (err) console.log(err) })


        const deleteResponse = await categoryModel.deleteOne({_id: id});
        return res
            .status(200)
            .send({ success: true, message: "Category deleted successfully !" });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCategory;
