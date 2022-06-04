import {aerolabApiEndpoint} from "../constants/aerolabApiEndpoint";
import {Data} from "../types";
import {Resources} from "../types/Resources";
import {fetch} from "../utils/fetch";
import {resources} from "../utils/resources";

export const aerolabApi = <T = any>(
  resource: string,
  data?: Data["redeem"] | Data["add-points"],
) => {
  const endpoint = resources[resource as Resources];
  const baseUrl = process.env.AEROLAB_API_BASE_URL ?? aerolabApiEndpoint;
  const url = baseUrl.concat(endpoint);

  const options: RequestInit = {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? process.env.AUTH_TOKEN}`,
    },
  };

  if (data) options.body = JSON.stringify(data);

  return fetch<T>(url, options);
};
