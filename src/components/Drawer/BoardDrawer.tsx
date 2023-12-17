// 'use client';

import React from 'react';
import { Bars4Icon } from '@heroicons/react/24/solid';

// components
import { BoardDrawerItem } from './BoardDrawerItem';

// store

// constants and functions
import { getAllProducts } from '@/lib/actions';

export async function BoardDrawer() {
  const allProducts = await getAllProducts();

  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* toggle button */}
        <label htmlFor="my-drawer" className="btn btn-outline drawer-button btn-sm">
          <Bars4Icon className="h-4 w-4" />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* sidebar */}

        <div className="menu flex h-full min-h-full w-80 flex-col overflow-hidden bg-base-200 p-4 text-base-content">
          {/* drawer title */}
          <h2 className="pb-4 text-start text-xl font-medium opacity-50">Watch List</h2>

          {/* boards list */}
          <div className="w-full flex-1 overflow-y-scroll">
            {allProducts &&
              allProducts?.map((product) => (
                <BoardDrawerItem key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
