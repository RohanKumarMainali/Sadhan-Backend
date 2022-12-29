const route = require("express").Router();
const session = require("express-session");
const userModel = require('../models/user.model.ts');
import { Express, Request, Response, NextFunction } from "express";

import crypto from 'crypto';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// signup and login

const {login,signup} = require('../controller/index.controllers').userControllers;
route.post('/user/signup',signup);

route.post('/user/login',login);


// sessions

const JWT_SECRET = "{8367E87C-B794-4A04-89DD-15FE7FDBFF78}"
const JWT_REFRESH_SECRET = "{asdfasdfdsfa-B794-4A04-89DD-15FE7FDBFF78}"

route.get('/session',async (req: any,res: any)=>{
    const token = req.cookies.JWT_TOKEN;
    if(token){
        
        const user = await validateToken(token,JWT_SECRET); 

    }
})

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
    (req: Request, res: Response) => {}
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

async function validateToken(token: String, secret: String) {
    try {
        const result  = jwt.verify(token, secret);
      
        return {
            "email": result.email,
        }
    }
    catch(ex){
        return null;
    }
   
  
}
 
async function randomString() {
    return crypto.randomBytes(64).toString('hex');
}
function sha256(txt: any){
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                    .update(txt)
                    .digest('hex');
   return hash;
}


module.exports = route;
