import nodemailer from 'nodemailer';

/*
Ports
25, 587	(for unencrypted/TLS connections)
465	(for SSL connections)
*/

const transporter = nodemailer.createTransport({
  host: process.env.SENDGRID_API_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDGRID_API_USER,
    pass: process.env.SENDGRID_API_KEY,
  },
});

export default transporter;
