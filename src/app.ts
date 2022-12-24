// importing necessary modules

require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/connectDB');
const session = require('express-session')
import {Express, Request, Response, NextFunction } from "express";

const passport = require('passport');
// server config
const app : Express = express();
require('./config/passportSetup.ts');

const PORT = process.env.PORT;
// database connection
connectDB();
const router  = require('./routes/index.routes');

// middlewares
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',router);

app.get('/dashboard',(req:Request,res:Request)=>{console.log('logged in')})
app.get('/login',(req:Request,res:Request)=> console.log('error'));

app.get('/google', passport.authenticate('google',{scope:['profile','email']}, (req:Request,res:Response)=>{}))

app.get('/google/callback', passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));


app.listen(PORT, ()=>console.log(`I am running at http://localhost:${PORT}`))
export default app;
