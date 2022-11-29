const express = require('express');
const connectDB = require('./utils/connectDB');

// or use import express from 'express'

import { Request, Response, NextFunction } from "express";
const app = express();
connectDB();
const router  = require('./routes/index.routes');

const addNumber = (a: number, b: number) : number => a+b;

app.use('/api',router);


export default app;