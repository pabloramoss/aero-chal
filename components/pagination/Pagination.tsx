import React from "react";

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number | undefined;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({productsPerPage, totalProducts, paginate}) => {
  const pageNumbers = [];

  if (totalProducts) {
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((page) => (
          <li key={page} onClick={() => paginate(page)}>
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
