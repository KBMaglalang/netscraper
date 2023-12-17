import nodemailer from 'nodemailer';

// components

// context

// constants and functions

export const nodemailerTransporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
});
