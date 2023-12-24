'use server';

import { cache } from 'react';

// components

// context

// constants and functions
import Product from '../models/product.model';
import connectToDB from '@/config/mongoose/mongoose';

export const getAllProducts = cache(async () => {
  try {
    await connectToDB();

    const products = await Product.find();

    // sort the product if it is pinned or not, product.pinned = true
    products.sort((a, b) => {
      return b.pinned - a.pinned;
    });

    return products;
  } catch (error) {
    console.log(error);
  }
});
