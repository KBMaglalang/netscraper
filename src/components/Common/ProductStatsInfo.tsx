import React from 'react';

// components

// context

// constants and functions
import { formatNumber } from '@/lib/utilities';

type Props = {
  product: any;
};

export const ProductStatsInfo = ({ product }: Props) => {
  return (
    <div className="stats flex w-full flex-col text-center shadow md:flex-row">
      <div className="stat">
        <div className="stat-title">Current Price</div>
        <div className="stat-value">
          {product.currency} {formatNumber(product.currentPrice)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Original Price</div>
        <div className="stat-value">
          {product.currency} {formatNumber(product.originalPrice)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Average Price</div>
        <div className="stat-value">{`${product.currency} ${formatNumber(
          product.averagePrice
        )}`}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Highest Price</div>
        <div className="stat-value">{`${product.currency} ${formatNumber(
          product.highestPrice
        )}`}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Lowest Price</div>
        <div className="stat-value">{`${product.currency} ${formatNumber(
          product.lowestPrice
        )}`}</div>
      </div>
    </div>
  );
};
