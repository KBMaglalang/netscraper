export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
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

  users?: User[];

  pinned: boolean;
  notificationPrice: number;
  notificationEnabled: boolean;
};

export type NotificationType = 'WELCOME' | 'CHANGE_OF_STOCK' | 'LOWEST_PRICE' | 'THRESHOLD_MET';

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};
