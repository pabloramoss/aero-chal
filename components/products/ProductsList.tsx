import {useEffect, useState} from "react";

import {
  useGetProductsQuery,
  useGetUserQuery,
  useRedeemMutation,
} from "@redux/features/products/productsApiSlice";
import {Product, Redeem} from "@types";
import {sortProducts} from "@utils/sortBy";

interface ProductsTest {
  products: Product[] | undefined;
  isLoading: Boolean;
}

const ProductsList: React.FC<ProductsTest> = ({products, isLoading}) => {
  const [sortOption, setSortOption] = useState<"recent" | "lowest" | "highest">("recent");
  const {data: user, refetch} = useGetUserQuery();
  const [redeem] = useRedeemMutation();
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

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

  const handleRedeem = async (id: Redeem) => {
    await redeem(id);
    refetch();
  };

  isLoading && <p>cargando...</p>;

  return (
    <>
      <button onClick={() => console.log(products)}>products</button>
      <button onClick={() => setSortOption("recent")}>Recent</button>
      <button onClick={() => setSortOption("lowest")}>Lowest price</button>
      <button onClick={() => setSortOption("highest")}>Highest price</button>
      {sortedProducts.length
        ? sortedProducts.map((product) => (
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
        : products?.map((product) => (
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
    </>
  );
};

export default ProductsList;
