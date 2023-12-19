'use server';

import { revalidatePath } from 'next/cache';

// context

// constants and functions
import Product from '../models/product.model';
import { connectToDB } from '@/config/mongoose/mongoose';

export async function deleteProductById(productId: string) {
  try {
    connectToDB();

    const results = await Product.deleteOne({ _id: productId });
    if (!results || results.deletedCount === 0) return null;

    revalidatePath('/', 'layout');

    return results;
  } catch (error) {
    console.log(error);
  }
}
