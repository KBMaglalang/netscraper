'use server';

// components

// context

// constants and functions
import Product from '../models/product.model';
import connectToDB from '@/config/mongoose/mongoose';

export async function getProductById(productId: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId }).lean();

    if (!product) return null;

    // fix product id
    product._id = product._id!.toString();

    // deal with the price history
    product.priceHistory = product.priceHistory.map((item: any) => {
      item._id = item._id!.toString();
      return item;
    });

    return product;
  } catch (error) {
    console.log(error);
  }
}
