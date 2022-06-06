import {Product} from "@types";

type SortType = "lowest" | "highest" | "recent";

export const sortProducts = (sortType: SortType, products: Product[]) => {
  const items = [...products];

  switch (sortType) {
    case "lowest":
      const sortAscending = items.sort((a: Product, b: Product) => a.cost - b.cost);

      return sortAscending;
    case "highest":
      const sortDescending = items.sort((a: Product, b: Product) => b.cost - a.cost);

      return sortDescending;
    case "recent":
      return products;
  }
};
