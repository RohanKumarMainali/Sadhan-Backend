const express = require('express');
// or use import express from 'express'

import { Request, Response, NextFunction } from "express";
const app = express();
const router  = require('./routes/index.routes');

const addNumber = (a: number, b: number) : number => a+b;

app.use('/api',router);

//testing roman branch

export default app;