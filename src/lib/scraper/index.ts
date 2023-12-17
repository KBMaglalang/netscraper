'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';

// components

// context

// constants and functions
import { extractPrice, extractDescription, extractCurrency } from '../utilities';
import { BRIGHT_DATA_SETTINGS } from '@/config/brightData/bright-data';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  try {
    // Fetch the product page
    const response = await axios.get(url, BRIGHT_DATA_SETTINGS);
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $('#productTitle').text().trim();
    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base')
    );
    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';
    const imageUrls = Object.keys(JSON.parse(images));

    // Construct data object with scraped information
    const data = {
      url,
      title,
      currency: currency || '$',
      image: imageUrls[0],
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      highestPrice: Number(originalPrice) || Number(currentPrice),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
      discountRate: Number(discountRate),

      pinned: false,
      notificationPrice: 0.0,
      notificationEnabled: false,
    };

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
