import { NextResponse } from 'next/server';

import { getLowestPrice, getHighestPrice, getAveragePrice } from '@/lib/utilities';
import connectToDB from '@/config/mongoose/mongoose';
import Product from '@/lib/models/product.model';
import { scrapeAmazonProduct } from '@/lib/scraper';
import sendEmail from '@/lib/actions/sendEmail';

// route settings
export const maxDuration = 10; // This function can run for a maximum of 300 seconds
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    await connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error('No product fetched');

    // update scraped products
    const updatedProducts = await Promise.all(
      // await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape product
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
          notificationEnabled: currentProduct.notificationEnabled,
          notificationPrice: currentProduct.notificationPrice,
          pinned: currentProduct.pinned,
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate({ url: product.url }, product);
        return updatedProduct;
      })
    );

    // check if api key is provided
    if (process.env.SENDGRID_API_KEY) {
      if (!process.env.SENDGRID_EMAIL_TO) throw new Error('No email provided');

      // check if notification of the product is enabled
      const productsToNotify = updatedProducts.filter((product) => product.notificationEnabled);

      // check if there is a price drop between the currentPrice and originalPrice
      const productsWithPriceDrop = productsToNotify.filter(
        (product) =>
          product.currentPrice <= product.notificationPrice ||
          product.currentPrice <= product.lowestPrice
      );

      // send the email
      await sendEmail(productsWithPriceDrop);
    }

    return NextResponse.json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}
