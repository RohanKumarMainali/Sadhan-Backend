const nodeMailer = require("nodemailer");

interface mailTemplate {
  email: string;
  subject: string;
  message: any;
  messageType: any;
}
const sendEmail = async (options: mailTemplate) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions : any = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  if (options.messageType === "html") {
    mailOptions = {
      from: process.env.EMAIL,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };
  }

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
