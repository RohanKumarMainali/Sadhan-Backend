const route = require("express").Router();
const session = require("express-session");
const userModel = require("../models/user.model.ts");
import { Express, Request, Response, NextFunction } from "express";

import crypto from "crypto";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup and login

const { login, signup } =
    require("../controller/index.controllers").userControllers;
route.post("/user/signup", signup);

route.post("/user/login", login);

// sessions

const JWT_REFRESH_SECRET = "{asdfasdfdsfa-B794-4A04-89DD-15FE7FDBFF78}";

route.get("/session",  (req: any, res: any) => {
    const token = req.cookies.token;
    console.log(token)
    const secret = process.env.ACCESS_TOKEN_KEY;
    if (token) {
        const user =  validateToken(token, secret);
        console.log('user '+user)
        if(user ===null) res.status(400).send({success: false, message: 'token invalid or expired'})
        else res.status(200).send({success: true, message: 'token verified'})
    }
        else res.status(400).send({success: false, message: 'no token '})

});

// social auth
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

route.get("/login/success", (req: any, res: any) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    } else res.status(400).send({ message: "sorry" });
});

route.get("/login/failed", (req: any, res: any) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

route.get("/logout", (req: any, res: any) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

route.get(
    "/google",
    passport.authenticate(
        "google",
        { scope: ["profile", "email"] },
        (req: Request, res: Response) => { }
    )
);

route.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

//test

async function validateToken(token: any, secret: any) {
    try {
        const result = jwt.verify(JSON.stringify(token),JSON.stringify(secret));
        return {
            email: result.id,
        };
    } catch (ex) {
        console.log(ex)
        return null;
    }
}

module.exports = route;
