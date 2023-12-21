import moment from 'moment';

export const formatDataForGraph = (productData: any): any[] => {
  const results: any[] = [];

  // set the first data point from product data
  results.push({
    name: moment(productData.createdAt).toLocaleString(),
    price: productData.currentPrice,
  });

  // set the rest of the data points from price history
  productData.priceHistory.forEach((priceHistory: any) => {
    results.push({
      name: moment(priceHistory.createdAt).toLocaleString(),
      price: priceHistory.price,
    });
  });

  return results;
};
