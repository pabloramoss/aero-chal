import {Products, ProductsApiResponse, User, Redeem, Points} from "../types";

import {aerolabApi} from "./aerolabApi";
import {customNextApi} from "./customNextApi";

export const api = {
  getProducts: () => aerolabApi<Products>("products"),
  getPaginatedProducts: (page: number, limit: number) =>
    customNextApi<ProductsApiResponse>(`/api/products?page=${page}&limit=${limit}`),
  getUser: () => aerolabApi<User>("user"),
  getHistory: () => aerolabApi<History>("user-history"),
  redeem: (productId: string) => aerolabApi<Redeem>("redeem", {productId}),
  addPoints: (amount: number) => aerolabApi<Points>("add-points", {amount}),
};
