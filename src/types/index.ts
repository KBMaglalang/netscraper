export type PriceHistoryItem = {
  _id?: string;
  price: number;
  date: Date;
};

export type NotificationSettings = {
  enabled: boolean;
  price: number;
};

export type Product = {
  _id?: string;
  updatedAt?: Date;

  url: string;
  title: string;
  currency: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;

  pinned: boolean;
  notificationPrice: number;
  notificationEnabled: boolean;
};
