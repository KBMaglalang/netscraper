'use server';

import { revalidatePath } from 'next/cache';
import supportsColor from 'supports-color';

// components

// context

// constants and functions
import connectToDB from '@/config/mongoose/mongoose';
import { scrapeAmazonProduct } from '../scraper';
import Product from '../models/product.model';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utilities';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    await connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, {
      upsert: true,
      new: true,
    });

    revalidatePath(`/products/${newProduct._id}`);
    revalidatePath('/', 'page');
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
