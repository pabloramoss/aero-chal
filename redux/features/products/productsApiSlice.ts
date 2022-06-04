import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {Product, History, User, Redeem} from "@types";

import {aerolabApiEndpoint} from "../../../constants/aerolabApiEndpoint";

import {AddPoints} from "./../../../types/index";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: aerolabApiEndpoint,
    prepareHeaders(headers) {
      headers.set("authorization", `Bearer ${API_KEY}`);

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getProducts: builder.query<Product[], void>({
        query() {
          return "/products";
        },
      }),
      getHistory: builder.query<History, void>({
        query() {
          return "/user/history";
        },
      }),
      getUser: builder.query<User, void>({
        query() {
          return "/user/me";
        },
      }),
      addPoints: builder.mutation<void, AddPoints>({
        query(body) {
          return {url: "/user/points", method: "POST", body};
        },
      }),
      redeem: builder.mutation<void, Redeem>({
        query(body) {
          return {url: "/redeem", method: "POST", body};
        },
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useAddPointsMutation,
  useGetHistoryQuery,
  useGetUserQuery,
  useRedeemMutation,
} = apiSlice;
