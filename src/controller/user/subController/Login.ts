import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcryptjs");
const userModel = require("../../../models/user.model");
const { StatusCodes } = require("http-status-codes");
const auth = require("../../../middleware/auth");

const login = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    //uid validation
    if (typeof email !== "string" || typeof password !== "string") {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send(
                "Client side validation issues. Please carefully send the right format of email and password !!"
            );
    }

    //database mapping

    try {
        const data = await userModel.find({ email: email });

        if (data !== undefined) {
            //compare encrypt password

            const isMatched = await data[0].matchPassword(password);
            if (!isMatched) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    success: false,
                    message: "Email or Password didn't matched",
                });
            }

            const { ACCESS_TOKEN, REFRESH_TOKEN } = await auth.GENERATE_JWT(email);

            // add refreshToken in the user document

            const update = await userModel.findByIdAndUpdate(data[0]._id, {
                token: REFRESH_TOKEN,
            });

            try {
                update.save()
                    .then((response: any) => {
                        return res.status(StatusCodes.OK).send({
                            message: "Login successfull! .",
                            email: email,
                            accessToken: ACCESS_TOKEN,
                            refreshToken: REFRESH_TOKEN,
                        });
                    }

                    )
            } catch (err) {
                return res.send(err)
            }
            
        }
    } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: err.message,
        });
    }
};

module.exports = login;
