'use server';

// components

// context

// constants and functions
import Product from '../models/product.model';
import connectToDB from '@/config/mongoose/mongoose';

export async function getSimilarProducts(productId: string) {
  try {
    await connectToDB();

    const currentProduct = await Product.findById(productId).lean();

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .limit(3)
      .lean();

    //fix product id
    similarProducts.forEach((product) => {
      product._id = product._id!.toString();

      // deal with the price history
      product.priceHistory = product.priceHistory.map((item: any) => {
        item._id = item._id!.toString();
        return item;
      });
    });

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}
