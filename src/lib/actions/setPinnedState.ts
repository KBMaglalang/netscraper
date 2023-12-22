'use server';

import { revalidatePath } from 'next/cache';

// context

// constants and functions
import Product from '../models/product.model';
import connectToDB from '@/config/mongoose/mongoose';

export async function setPinnedState(productId: string, state: boolean) {
  try {
    await connectToDB();

    // update the notification price of the product
    const results = await Product.findOneAndUpdate(
      { _id: productId },
      {
        pinned: state,
      },
      { new: true }
    ).lean();

    // check if the product exists
    if (!results) return null;

    // fix the _id property
    results._id = results._id.toString();

    results.priceHistory = results.priceHistory.map((item: any) => {
      item._id = item._id!.toString();
      return item;
    });

    revalidatePath('/', 'layout');

    return results;
  } catch (error) {
    console.log(error);
  }
}
