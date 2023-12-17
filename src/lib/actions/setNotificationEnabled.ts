'use server';

// context

// constants and functions
import Product from '../models/product.model';
import { connectToDB } from '@/config/mongoose/mongoose';

export async function setNotificationEnabled(productId: string, state: boolean) {
  try {
    connectToDB();

    // update the notification price of the product
    const results = await Product.findOneAndUpdate(
      { _id: productId },
      {
        notificationEnabled: state,
      },
      { new: true }
    );

    // check if the product exists
    if (!results) return null;

    return results;
  } catch (error) {
    console.log(error);
  }
}
