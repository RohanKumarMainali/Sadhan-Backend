
import { Request,Response } from "express"
const LOGIN =  (req: Request, res: Response) =>{
    
    
    return res.status(200).send("admin Login is working properly");
};

module.exports = LOGIN;