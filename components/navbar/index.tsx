import Image from "next/image";

import MainContainer from "@components/containers/mainContainer";
import useMediaQuery from "@hooks/useMediaQuery";

import AeroCoin from "./aeroCoin";
import NavbarContainer from "./container";

function Navbar() {
  const isTablet = useMediaQuery(1024);

  return (
    <NavbarContainer>
      <MainContainer>
        <div className="image-container">
          <Image
            alt="Aerolab Logo"
            layout="fill"
            objectFit="contain"
            src={`/assets/icons/aerolab-logo-${isTablet ? "2" : "1"}.svg`}
          />
        </div>
        <AeroCoin />
      </MainContainer>
    </NavbarContainer>
  );
}

export default Navbar;
