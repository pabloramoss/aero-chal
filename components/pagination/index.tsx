import React, {useState} from "react";

import {Product} from "@types";
import Products from "@components/products";

interface PaginationProps {
  products: Product[];
}

const Pagination: React.FC<PaginationProps> = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  //Get current products
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

  return <>{`<Products products={currentProducts} />`}</>;
};

export default Pagination;
