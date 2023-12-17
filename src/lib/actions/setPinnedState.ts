'use server';

import { revalidatePath } from 'next/cache';

// context

// constants and functions
import Product from '../models/product.model';
import { connectToDB } from '@/config/mongoose/mongoose';

export async function setPinnedState(productId: string, state: boolean) {
  try {
    connectToDB();

    // update the notification price of the product
    const results = await Product.findOneAndUpdate(
      { _id: productId },
      {
        pinned: state,
      },
      { new: true }
    );

    // check if the product exists
    if (!results) return null;

    revalidatePath('/');

    return results;
  } catch (error) {
    console.log(error);
  }
}
