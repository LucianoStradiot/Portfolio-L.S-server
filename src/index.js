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
    subject: 'Nuevo mensaje de contacto',
    text: `Name: ${name}\nLast Name:${lastName}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Correo enviado con éxito');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});
