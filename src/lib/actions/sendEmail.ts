'use server';

import transporter from '@/config/sendGrid/send-grid';
import { Product } from '@/types';

export default async function sendEmail(productData: Product[]) {
  if (productData.length === 0) return; // no product data provided or no price drop

  // sort the data to get the title, current price, original price, and url
  const sortedData = productData.map((product) => {
    const { title, currentPrice, originalPrice, url } = product;
    return { title, currentPrice, originalPrice, url };
  });
  if (sortedData.length === 0) return;

  // create the html
  const html = sortedData
    .map(
      (product) => `
    <div>
      <h2>${product.title}</h2>
      <p>Current Price: ${product.currentPrice}</p>
      <p>Original Price: ${product.originalPrice}</p>
      <a href="${product.url}">Product Link</a>
    </div>
  `
    )
    .join('');
  if (!html) return;

  const options = {
    from: process.env.SENDGRID_EMAIL_FROM,
    to: process.env.SENDGRID_EMAIL_TO,
    subject: 'Netscraper',
    text: 'currenly in test mode',
    html: html,
  };

  try {
    await transporter.sendMail(options);
  } catch (err) {
    return err;
  }
}
