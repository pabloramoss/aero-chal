import React from "react";

import {Product} from "@types";

interface FilterProps {
  setCurrentCategory: (category: string) => void;
  products: Product[];
}

const Filter: React.FC<FilterProps> = ({setCurrentCategory, products}) => {
  const allCategories = products.map((product) => product.category);
  const categories = Array.from(new Set(allCategories.concat("All products")));

  return (
    <select
      name="filter"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setCurrentCategory(e.currentTarget.value)
      }
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Filter;
