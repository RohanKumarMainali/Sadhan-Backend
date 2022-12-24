 
import { NextFunction, Request, Response } from "express";

const DASHBOARD = (req: Request, res: Response, next: NextFunction) => {
 
// const SIGNUP = require('./subController/Signup')
    return res.send('Logged in');
}

module.exports = {dashboard: DASHBOARD};
