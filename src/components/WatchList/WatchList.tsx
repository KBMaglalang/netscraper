import React from 'react';

// components
import { ProductCard } from '../Common/ProductCard';

// context

// constants and functions
import { getAllProducts } from '@/lib/actions';

export const WatchList = async () => {
  const allProducts = await getAllProducts();

  return (
    <section className="watchList container mx-auto mt-4">
      <h2 className="my-4 text-xl font-medium opacity-50">Watch List</h2>

      <div className="flex flex-wrap items-center justify-center gap-8 md:flex-wrap md:items-start md:justify-start ">
        {allProducts?.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
};
