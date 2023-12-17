'use server';

// components

// context

// constants and functions
import { EmailContent } from '@/types';
import { nodemailerTransporter } from '@/config/nodemailer/nodemailer';

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  nodemailerTransporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log('Email sent: ', info);
  });
};
