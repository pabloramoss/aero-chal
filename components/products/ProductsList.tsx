import {useEffect, useState} from "react";

import {useGetUserQuery, useRedeemMutation} from "@redux/features/products/productsApiSlice";
import {Product, Redeem} from "@types";
import {sortProducts} from "@utils/sortBy";
import Pagination from "@components/pagination/Pagination";

import Filter from "./Filter";

interface ProductsTest {
  products: Product[];
  isLoading: Boolean;
}

const ProductsList: React.FC<ProductsTest> = ({products, isLoading}) => {
  const [sortOption, setSortOption] = useState<"recent" | "lowest" | "highest">("recent");
  const {data: user, refetch} = useGetUserQuery();
  const [redeem] = useRedeemMutation();
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  //Get current products
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = (products: Product[]) => {
    const productsOnScreen = products.slice(indexFirstProduct, indexLastProduct);

    return productsOnScreen;
  };

  //abstraer funcion
  const canIBuy = (productCost: number) => {
    if (user) {
      if (productCost <= user.points) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    products && setSortedProducts(sortProducts(sortOption, products));
  }, [sortOption]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRedeem = async (id: Redeem) => {
    await redeem(id);
    refetch();
  };

  isLoading && <p>cargando...</p>;

  return (
    <>
      <Filter products={products} />
      <button onClick={() => console.log(products)}>products</button>
      <button onClick={() => setSortOption("recent")}>Recent</button>
      <button onClick={() => setSortOption("lowest")}>Lowest price</button>
      <button onClick={() => setSortOption("highest")}>Highest price</button>
      {sortedProducts.length
        ? currentProducts(sortedProducts).map((product) => (
            <div key={product._id}>
              <p>{product.name}</p>
              <p>{product.cost}</p>
              {canIBuy(product.cost) ? (
                <button onClick={() => handleRedeem({productId: product._id})}>Buy now</button>
              ) : (
                <button disabled>You need more points</button>
              )}
            </div>
          ))
        : currentProducts(products).map((product) => (
            <div key={product._id}>
              <p>{product.name}</p>
              <p>{product.cost}</p>
              {canIBuy(product.cost) ? (
                <button onClick={() => handleRedeem({productId: product._id})}>Buy now</button>
              ) : (
                <button disabled>You need more points</button>
              )}
            </div>
          ))}
      <Pagination
        paginate={paginate}
        productsPerPage={productsPerPage}
        totalProducts={products?.length}
      />
    </>
  );
};

export default ProductsList;
