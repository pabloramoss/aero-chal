import {useState} from "react";

import { motion } from 'framer-motion';
import { useProductsPagination } from '../../../hooks/useProductsPagination';
import { ProductListContainer } from './container';
import useUser from '../../../hooks/useUser';
import ProductCard from '../../cards/product';
import { isProductRedemeed } from '../../../utils/is-product-redemeed';
import { canRedeemProduct } from '../../../utils/can-redeem-product';
import {EmptyProducts} from "./empty-products";

const ProductList: React.FC = () => {
  const [active, setActive] = useState(false);
  const {data: user} = useUser();
  const {isLoading, filteredProducts, history} = useProductsPagination(active);

  return filteredProducts.length ? (
    <ProductListContainer
      arial-label='List of products'
        as={motion.ul}
        role='list'
        viewport={{ once: true }}
        onViewportEnter={() => setActive(true)}>
    >
      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          isSkeleton={isLoading}
          {...product}
          isRedeemed={filteredProducts && history ? isProductRedemeed(product, history) : false}
          notEnoughPoints={isLoading || (user && canRedeemProduct(product, user?.points))}
        />
      ))}
    </ProductListContainer>
  ) : (
    <EmptyProducts />
  );
};

export default ProductList;
