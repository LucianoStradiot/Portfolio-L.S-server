import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

app.post('/contact', (req, res) => {
  const { name, lastName, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.USER,
    subject: 'New message from lucianostradiot.com',
    text: `Name: ${name}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    html: `<h2 style='color: #683d69'>Name:</h2> <h3>${name}</h3>
    <h2 style='color: #683d69'>Last Name:</h2> <h3>${lastName}</h3>
    <h2 style='color: #683d69'>Email:</h2> <h3>${email}</h3>
    <h2 style='color: #683d69'>Message:</h2><h3>${message}</h3>`,
    replyTo: email
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sended succesfully');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server initialized on port: ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
