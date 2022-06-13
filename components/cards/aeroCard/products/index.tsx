import {useEffect, useState} from "react";
import Image from "next/image";
import {toast} from "react-toastify";
import {AnimatePresence, motion} from "framer-motion";

import useRedeem from "../../../hooks/useReedem";
import CardButton from "../../buttons/card-button";
import Text from "../../texts/text";
import TextL2Caps from "../../texts/text-l2-caps";
import {Product} from "../../../types/Product";
import Alert from "../../commons/alert";
import ImageSkeleton from "../../commons/image-skeleton";

import ActiveIcon from "./active-icon";
import InactiveIcon from "./inactive-icon";
import {ProductCardContainer, ProductContainer} from "./containers";

interface Props extends Product {
  notEnoughPoints?: boolean;
  isSkeleton?: boolean;
  isRedeemed?: boolean;
}

const ProductCard: React.FC<Props> = (props) => {
  const [redeemNow, setRedeem] = useState(false);
  const {notEnoughPoints, isSkeleton, name, category, cost, img, _id, isRedeemed} = props;
  const {isLoading, mutate: redeem, status} = useRedeem();

  useEffect(() => {
    if (status === "success" || status === "error") {
      toast(<Alert product={name} type={status} />, {type: status});
    }
  }, [status, name]);

  let text = isSkeleton ? (
    ""
  ) : isLoading ? (
    "Processing..."
  ) : redeemNow ? (
    `Redeem now!`
  ) : notEnoughPoints ? (
    <>
      You need <InactiveIcon /> {cost}
    </>
  ) : isRedeemed ? (
    "Redeemed"
  ) : (
    <>
      Redeem for <ActiveIcon /> {cost}
    </>
  );

  return (
    <AnimatePresence>
      <ProductContainer
        arial-label={`Item ${name}`}
        as={motion.li}
        exit={{y: 50}}
        initial={{opacity: 0, y: 50}}
        role="listitem"
        viewport={{once: true}}
        whileInView={{opacity: 1, y: 0}}
      >
        <ProductCardContainer>
          <div className={`product-image ${isSkeleton ? "product-image-skeleton" : ""}`}>
            {isSkeleton ? (
              <ImageSkeleton />
            ) : (
              <Image
                alt="product"
                className="product-image-item"
                layout="fill"
                loading="lazy"
                objectFit="contain"
                src={img.url}
              />
            )}
          </div>
          <div className={`product-detail ${isSkeleton ? "product-detail-skeleton" : ""}`}>
            <Text color="gray900">{name}</Text>
            <TextL2Caps color="gray600">{category}</TextL2Caps>
          </div>
        </ProductCardContainer>
        <CardButton
          as={motion.button}
          disablePointer={notEnoughPoints || isRedeemed || isLoading}
          disabled={notEnoughPoints || isRedeemed || isLoading}
          initial={{scale: 1}}
          loading={isSkeleton}
          whileHover={{scale: 1.05}}
          onBlur={() => {
            setRedeem(false);
          }}
          onClick={() => {
            redeem(_id);
          }}
          onFocus={() => {
            setRedeem(true);
          }}
          onMouseEnter={() => {
            setRedeem(true);
          }}
          onMouseLeave={() => {
            setRedeem(false);
          }}
        >
          <Text color="white">{text}</Text>
        </CardButton>
      </ProductContainer>
    </AnimatePresence>
  );
};

export default ProductCard;
