const route = require('express').Router()
const {dashboard} = require('../controller/index.controllers').dashboard;
const session = require('express-session')
import {Express, Request, Response, NextFunction } from "express";

const passport = require('passport');
// server config

const CLIENT_URL = 'http://localhost:3000/';
route.get('/dashboard',dashboard);

route.get('/login/success',(req:any,res:any)=>{
    if(req.user){
       res.status(200).json({
           success:true,
           message: "successfull",
           user: req.user,
       });
    }
    else res.status(400).send({message:'sorry'})
})

route.get("/login/failed", (req: any, res: any) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});


route.get('/logout',(req:any,res:any)=>{
    req.logout();
    res.redirect(CLIENT_URL);
})

route.get('/google', passport.authenticate('google',{scope:['profile','email']}, (req:Request,res:Response)=>{}))

route.get('/google/callback', passport.authenticate( 'google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login/failed'
}));
//test

module.exports = route;
