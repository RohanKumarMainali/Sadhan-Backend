const bookingRoute = require("express").Router();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const mailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");

//const {createBooking} = require('../controller/khalti/index.controller');
const { createBooking, getRentals, getBooking } =
  require("../controller/index.controllers").bookingControllers;

bookingRoute.post("/bookVehicle", createBooking);
bookingRoute.get("/booking", getBooking);
bookingRoute.get("/getRentals/:ownerId", getRentals);



module.exports = bookingRoute;
