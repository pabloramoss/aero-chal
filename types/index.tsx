import {resources} from "../utils/resources";

export type Resources = keyof typeof resources;

export interface User {
  id: string;
  name: string;
  points: number;
  createDate: string;
  redeemHistory: History;
}

export interface HistoryItem extends Product {
  productId: string;
}

export type History = HistoryItem[];

export interface Product {
  _id: string;
  name: string;
  cost: number;
  category: string;
  img: {
    url: string;
    hdUrl?: string;
  };
}

export type Products = Product[];

export type Points = {
  message: string;
  "New Points": number;
};

export interface Data {
  redeem: {
    productId: string;
  };
  "add-points": {
    amount: number;
  };
}

export interface ProductsApiResponse {
  results: Products;
  total: number;
  size: number;
  page: number;
  nextPage: number;
  previousPage?: number;
  hasMore: boolean;
}

export type Redeem = {
  productId: string;
};

export type Responses = {
  user: User;
  products: Products;
  redeem: Redeem;
  "add-points": Points;
  "user-history": History;
};

export interface User {
  id: string;
  name: string;
  points: number;
  redeemHistory: History;
  createDate: string;
}

export interface AddPoints {
  amount: 1000 | 5000 | 7500;
}
