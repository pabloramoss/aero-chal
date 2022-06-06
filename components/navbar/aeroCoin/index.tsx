import {useCallback, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";

import Arrow from "@components/commons/arrowBtn";
import useMediaQuery from "@hooks/useMediaQuery";
import useHandlerKeyPress from "@hooks/useHandlerKeyPress";
import {navVariants} from "@utils/animations";
import {useGetUserQuery} from "@redux/features/products/productsApiSlice";

import {AeroCoinContainer} from "./containers";

function AeroCoin() {
  const [isOpen, setIsOpen] = useState(false);
  const isTablet = useMediaQuery(1024);
  const handleOnClick = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleOnKeyPress = useHandlerKeyPress(() => {
    setIsOpen((prev) => !prev);
  });
  const {data: user, isLoading} = useGetUserQuery();

  return (
    <>
      <AeroCoinContainer
        animate="visible"
        as={motion.div}
        custom="aero-coin"
        initial="hidden"
        variants={navVariants}
      >
        <div
          aria-pressed="mixed"
          className="controller"
          role="button"
          tabIndex={1}
          onClick={handleOnClick}
          onKeyPress={handleOnKeyPress}
        >
          <Image
            alt="Aeropain Icon"
            height={isTablet ? "24" : "32"}
            src="/icons/aeropay-1.svg"
            width={isTablet ? "24" : "32"}
          />
          <p>{isLoading ? "..." : user?.points}</p>
          <div className="arrow-container">
            <Arrow direction={isOpen ? "bottom" : "top"} />
          </div>
        </div>
      </AeroCoinContainer>
    </>
  );
}

export default AeroCoin;
