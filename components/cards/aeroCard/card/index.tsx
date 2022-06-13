import Image from "next/image";

import {normalizeWithRandomYear} from "../../../../utils/normalize-with-random-year";
import useUser from "../../../../hooks/useUser";
import Text from "../../../texts/text";
import TextL2 from "../../../texts/text-l2";

import {CardContainer, WaveBG} from "./containers";

const Card = () => {
  const {data: user} = useUser();

  return (
    <CardContainer>
      <div className="card-header">
        <Text color="white">Aerocard</Text>
        <Image
          alt="Aerolab Icon Card"
          height="24"
          src="/assets/icons/aerolab-icon-card.svg"
          width="24"
        />
      </div>
      <div className="card-description">
        <TextL2 color="white">{user?.name}</TextL2>
        <TextL2 color="white">{normalizeWithRandomYear(user?.createDate)}</TextL2>
      </div>
      <WaveBG />
    </CardContainer>
  );
};

export default Card;
