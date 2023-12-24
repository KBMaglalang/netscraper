'use server';

import transporter from '@/config/sendGrid/send-grid';

export default async function sendEmail() {
  const options = {
    from: process.env.SENDGRID_EMAIL_FROM,
    to: process.env.SENDGRID_EMAIL_TO,
    subject: 'Netscraper',
    text: 'currenly in test mode',
  };

  try {
    const info = await transporter.sendMail(options);
    console.log('🚀 ~ file: sendEmail.ts:34 ~ sendEmail ~ info:', info);
  } catch (err) {
    console.log('🚀 ~ file: sendEmail.ts:34 ~ sendEmail ~ err:', err);
  }
}
