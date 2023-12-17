'use server';

// components

// context

// constants and functions
import Product from '../models/product.model';
import { connectToDB } from '@/config/mongoose/mongoose';

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}
