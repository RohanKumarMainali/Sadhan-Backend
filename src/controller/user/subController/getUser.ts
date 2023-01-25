
import { NextFunction, Request, Response } from "express";
const userModel = require("../../../models/user.model");

const getUser = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        
        const response = await userModel.find({});
        return res.status(200).send({success:true, data: response})
    } catch (error) {
        next(error)
        
    }
}

module.exports = getUser

