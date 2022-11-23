const express = require('express');
// or use import express from 'express'

import { Request, Response, NextFunction } from "express";
const app = express();

const addNumber = (a: number, b: number) : number => a+b;

app.post('/users',(req: Request, res: Response)=>{
    let sum: number = addNumber(5,5);
    res.status(200).send("hello ");
})

export default app;