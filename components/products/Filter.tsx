import React from "react";

import {Product} from "@types";

interface FilterProps {
  products: Product[];
}

const Filter: React.FC<FilterProps> = ({products}) => {
  const allCategories = products.map((product) => product.category);
  const categories = Array.from(new Set(allCategories));

  return (
    <select name="filter">
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Filter;
