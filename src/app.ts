// importing necessary modules

require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/connectDB');
import { Request, Response, NextFunction } from "express";

const passport = require('passport');
// server config
const app = express();
require('./config/passportSetup.ts')

const PORT = process.env.PORT;
// database connection
connectDB();
const router  = require('./routes/index.routes');

// middlewares
app.use(express.json());
app.use('/api',router);


app.get('/google', passport.authenticate('google',{scope:['profile','email']}))




app.listen(PORT, ()=>console.log(`I am running at http://localhost:${PORT}`))
export default app;
