import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcryptjs");
const adminModel = require("../../../models/admin.model");
const { StatusCodes } = require("http-status-codes");
const auth = require("../../../middleware/auth");

const LOGIN = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  //uid validation
  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(
        "Client side validation issues. Please carefully send the right format of email and password !!"
      );
  }

  //database mapping

  try {
    const data = await adminModel.find({ username: username });

    if (data !== undefined) {
      //compare encrypt password
      
      const isMatched = await data[0].matchPassword(password);
      if (!isMatched) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          success: false,
          message: "Email or Password didn't matched",
        });
      }

      const { ACCESS_TOKEN, REFRESH_TOKEN} = await auth.GENERATE_JWT(username);
      return res.status(StatusCodes.OK).send({
        message: "Login successfull! .",
        username: username,
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
      });
    }
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: err.message,
    });
  }
};

module.exports = LOGIN;
