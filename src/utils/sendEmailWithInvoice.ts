const fs = require("fs");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const sendEmail = require('./sendEmail')

// Function to create the invoice PDF

const createInvoice = (invoice, path) =>{
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  // Generate the PDF content
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

// Function to send the email with the invoice PDF attached
const sendEmailWithInvoicePdf = async(email, path)=> {
    // Create an email message
  let message = {
    email: email,
    subject: "Invoice",
    attachments: [
      {
        filename: "invoice.pdf",
        path: path
      }
    ]
  };

  // Send the email
  let info = await sendEmail(message);

  console.log("Email sent: ", info);
}

// Usage example
const invoice = {
  // your invoice data here
};

const invoicePath = "invoice.pdf";
module.exports = {createInvoice, sendEmailWithInvoicePdf}
createInvoice(invoice, invoicePath);
sendEmailWithInvoicePdf("rohanmainali39@gmail", invoicePath);
