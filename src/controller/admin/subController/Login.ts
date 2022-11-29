
import { Request,Response } from "express"
const LOGIN =  (req: Request, res: Response) =>{
    
    res.send("admin Login is working properly");
};

module.exports = LOGIN;