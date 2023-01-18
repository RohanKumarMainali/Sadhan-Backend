const userModel = require("../../../models/user.model");
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const forgotPassword = async (req: Request, res: Response) => {
  const { newPassword, confirmPassword } = req.body;
  const { id, token } = req.params;

  try {
    if (newPassword && confirmPassword && id && token) {
      if (newPassword === confirmPassword) {
        //
        //check if token is valid or already expired
        const verifyToken = await jwt.verify(
          token,
          process.env.ACCESS_TOKEN_KEY
        );
      } else
        return res.status(400).send({ message: "Both password are not same!" });
    } else
      return res.status(400).send({ message: "Please provide all fields!" });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

module.exports = forgotPassword;
