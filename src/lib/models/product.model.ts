// import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    highestPrice: { type: Number },
    lowestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },

    users: [{ email: { type: String, required: true } }],

    notificationPrice: { type: Number, default: 0.0 },
    notificationEnabled: { type: Boolean, default: false },

    pinned: { type: Boolean, default: false },

    default: [],
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', productSchema);

export default Product;
