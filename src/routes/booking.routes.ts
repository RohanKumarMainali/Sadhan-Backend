const bookingRoute = require("express").Router();
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

async function generatePdfAndSendEmail(html : string) {
  // Create a new Puppeteer browser instance
  const browser = await puppeteer.launch();

  // Create a new page in the browser
  const page = await browser.newPage();

  // Set the page content to the provided HTML
  await page.setContent(html);

  // Generate the PDF buffer from the page
  const pdfBuffer = await page.pdf({ format: "A4" });

  // Close the browser
  await browser.close();

  // Create a transporter for sending email
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Send the email with the PDF attachment
  const mailOptions = {
    from: process.env.EMAIL,
    to: "rohanmainali39@gmail.com",
    subject: "Invoice",
    html: "<p>Please find attached the invoice.</p>",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
      },
    ],
  };
  await transporter.sendMail(mailOptions);
}


const html = '<h1>Hello, world!</h1><p>This is some example HTML content.</p>';

bookingRoute.post("/check", async () => {
  await generatePdfAndSendEmail(html);
});

module.exports = bookingRoute;
