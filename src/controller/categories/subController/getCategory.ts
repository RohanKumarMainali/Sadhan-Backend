const categoryModel = require("../../../models/category.model");
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const cloudinary = require("../../../utils/cloudinary");
const slugify = require("slugify");

interface imageType {
  public_id: string;
  url: string;
}

const createCategory = (categoryList: any, parentId=null) =>{

    const modifiedCategoryList = [];
    let category;
    if(parentId===nll){
        category = categoryList.filter((category: any) => category.parentId == undefined);
    }else{
        category = categoryList.filter((category: any) => category.parentId == parentId);
    }

    for(let eachCategory of category){

        modifiedCategoryList.push({
            _id: eachCategory._id,
            name: eachCategory.name,
            slug: eachCategory.slug,
            children: createCategory(categoryList, eachCategory._id)

        })

    }

    return modifiedCategoryList;
}} 
} 

const getCategory = async (req: any, res: Response, next: NextFunction) => {
  try {
    const response = await categoryModel.find({});

    categoryList = createCategory(response)
    return res.status(200).send({
      success: true,
      categoryList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategory;
