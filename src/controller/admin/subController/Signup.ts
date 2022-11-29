import { Request,Response } from "express"
const SIGNUP =  (req: Request, res: Response) =>{
    
    res.send("admin Login is working properly");
};

module.exports = SIGNUP;