import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';

// components

// context

// constants and functions
import { Product } from '@/types';
interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="min-h-96 hover:border-primary-500 card w-80 bg-base-100 shadow-xl transition-all hover:shadow-2xl"
    >
      <figure className="h-80 w-full">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className=" rounded-lg object-contain"
        />
      </figure>

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
