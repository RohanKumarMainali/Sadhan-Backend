// importing necessary modules

const express = require('express');
const connectDB = require('./utils/connectDB');
import { Request, Response, NextFunction } from "express";

// server config
const app = express();

// database connection
connectDB();
const router  = require('./routes/index.routes');

// middlewares
app.use(express.json());
app.use('/api',router);


export default app;