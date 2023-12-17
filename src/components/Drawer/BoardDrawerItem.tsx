import React from 'react';
import moment from 'moment';
import Link from 'next/link';

// components

// context

// constants and functions
import { Product } from '@/types';

interface Props {
  product: Product;
}

export const BoardDrawerItem = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="min-h-48 hover:border-primary-500 card mb-4 w-full bg-base-100 shadow-xl transition-all hover:shadow-2xl"
    >
      <div className="card-body ">
        <h3 className="card-title truncate">{product.title}</h3>
        <p className="">
          <span>{product?.currency}</span>
          <span>{product?.currentPrice}</span>
        </p>
        <span>{moment(product?.updatedAt).toLocaleString()}</span>
      </div>
    </Link>
  );
};
