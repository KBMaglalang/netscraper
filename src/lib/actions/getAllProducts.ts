'use server';

// components

// context

// constants and functions
import Product from '../models/product.model';
import connectToDB from '@/config/mongoose/mongoose';

export async function getAllProducts() {
  try {
    await connectToDB();

    const products = await Product.find().lean();

    // sort the product if it is pinned or not, product.pinned = true
    products.sort((a, b) => {
      return b.pinned - a.pinned;
    });

    //fix product id
    products.forEach((product) => {
      product._id = product._id!.toString();

      // deal with the price history
      product.priceHistory = product.priceHistory.map((item: any) => {
        item._id = item._id!.toString();
        return item;
      });
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}
