const route = require('express').Router()
const {dashboard} = require('../controller/index.controllers').dashboard;
const session = require('express-session')
import {Express, Request, Response, NextFunction } from "express";

const passport = require('passport');
// server config


route.get('/dashboard',dashboard);

route.get('/login',(req:Request,res:Request)=> console.log('error'));

route.get('/google', passport.authenticate('google',{scope:['profile','email']}, (req:Request,res:Response)=>{}))

route.get('/google/callback', passport.authenticate( 'google', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/login'
}));
//test

module.exports = route;
