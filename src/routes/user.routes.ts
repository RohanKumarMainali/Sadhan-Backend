const route = require("express").Router();
const session = require("express-session");
const userModel = require("../models/user.model.ts");
const adminModel = require("../models/admin.model.ts");
import { Express, Request, Response, NextFunction } from "express";

const dayjs = require("dayjs");
import crypto from "crypto";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const atob = require("atob");
const auth = require("../middleware/auth");
require("dotenv").config();

// signup and login

const {
  login,
  refreshToken,
  signup,
  changePassword,
  forgotPassword,
  forgotPasswordEmail,
  getUser,
  deleteUser,
} = require("../controller/index.controllers").userControllers;

route.post("/user/signup", signup);

route.post("/user/login", login);

// change password
route.post("/user/changePassword", changePassword);

// forgot password
//
route.post("/user/forgotPassword", forgotPasswordEmail);
route.post("/user/forgotPassword/:id/:token", forgotPassword);

// get all user
route.get("/getUser", getUser);

// get single user by id
route.get("/getUser/:id", getUser);

// delete user by id

route.delete("/deleteUser/:id", deleteUser);

route.get("/user/logout", (req: Request, res: Response) => {
  //DELETING  COOKIE
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  return res.status(200).send({ message: "Logged out successfully!" });
});

route.post("/renewToken", async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).send({ message: "User not authenticated" });
  else {
    try {
      const secret = process.env.REFRESH_TOKEN_KEY;
      const user = jwt.verify(refreshToken, secret);
      if (user == null)
        return res
          .status(401)
          .send({ success: false, message: "token invalid or expired" });
      else {
        // decode payload from token
        const base64URL = refreshToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64URL));
        const { id, firstName, lastName, email, role } = decodedPayload;
        const payload = { id, firstName, lastName, email, role };
        const { ACCESS_TOKEN, REFRESH_TOKEN } = await auth.GENERATE_JWT(
          payload
        );

        // replace old refresh token with new one in db
        let update;
        if (role === "user") {
          update = await userModel.findByIdAndUpdate(payload.id, {
            token: REFRESH_TOKEN,
          });
        } else if (role == "admin") {
          update = await adminModel.findByIdAndUpdate(payload.id, {
            token: REFRESH_TOKEN,
          });
        }

        res.clearCookie("token");
        res.clearCookie("refreshToken");
        // add refreshToken in the user document
        await update.save();

        res.cookie("token", ACCESS_TOKEN, {
          httpOnly: true,
          expires: dayjs().add(30, "days").toDate(),
        });

        res.cookie("refreshToken", REFRESH_TOKEN, {
          httpOnly: true,
          expires: dayjs().add(30, "days").toDate(),
        });

        return res.status(200).send({
          message: "token refreshed!",
          payload: payload,
          accessToken: ACCESS_TOKEN,
        });
      }
    } catch (err: any) {
      return res.status(400).send(err.message);
    }
  }
});

// sessions

route.get("/session", (req: Request, res: Response) => {
  const token = req.cookies.token;
  const secret = process.env.ACCESS_TOKEN_KEY;
  try {
    if (token) {
      const user = jwt.verify(token, secret);

      if (user == null)
        return res
          .status(400)
          .send({ success: false, message: "token invalid or expired" });
      else {
        // decode payload from token
        const base64URL = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64URL));
        return res.status(200).send({
          success: true,
          message: "token verified",
          payload: decodedPayload,
        });
      }
    } else
      return res
        .status(400)
        .send({ success: false, message: "no token ", token: token });
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
});

// get token from cookies

route.get("/token", (req: Request, res: Response) => {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  if (!token || !refreshToken)
    return res.status(401).send({ message: "No token" });
  return res
    .status(200)
    .send({ accessToken: token, refreshToken: refreshToken });
});

// social auth
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

route.get("/login/success", (req: any, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  } else res.status(400).send({ message: "login failed" });
});

route.get("/login/failed", (req: any, res: any) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

route.get("/logout", (req: any, res: any) => {
  res.clearCookie("session");
  req.logout();
  res.redirect(CLIENT_URL);
});

route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// after login with google auth
route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  async(req: any, res: any) => {

    const { ACCESS_TOKEN, REFRESH_TOKEN } = await auth.GENERATE_JWT(req.user);
    res.cookie("token", ACCESS_TOKEN, {
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    });

    res.cookie("refreshToken", REFRESH_TOKEN, {
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    });

    const result : any= await userModel.findOneAndUpdate({email: req.user.email}, {$set: {token: REFRESH_TOKEN}})
    req.user = {_id: result._id, firstName: result.firstName,lastName: result.lastName, email: req.email, role: 'user'}
    res.redirect("http://localhost:3000");
  }
);
module.exports = route;
