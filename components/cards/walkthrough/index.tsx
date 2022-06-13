import TextGradient from "../../commons/text-gradient";
import Text from "../../texts/text";

import {
  DescriptionCardContainer,
  IllustrationCardContainer,
  WalkthroughCardContainer,
} from "./containers";
import {CardImage} from "./image";
import WalkthroughTitle from "./title";

interface Props {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  illustrationUrl: string;
  rotation?: string;
}

const WalkthroughCard: React.FC<Props> = (props) => {
  const {title, description, illustrationUrl, rotation, id} = props;

  return (
    <WalkthroughCardContainer cardId={id} rotation={rotation}>
      <IllustrationCardContainer>
        <CardImage alt={title.concat(" Walkthrough")} src={illustrationUrl} />
      </IllustrationCardContainer>
      <DescriptionCardContainer>
        <WalkthroughTitle iconId={id}>
          <TextGradient type="brand">
            {id}
            <span className="separator">—</span>
            {title}
          </TextGradient>
        </WalkthroughTitle>
        <div className="description-wrapper">
          <Text color="gray600">{description}</Text>
        </div>
      </DescriptionCardContainer>
    </WalkthroughCardContainer>
  );
};

export default WalkthroughCard;
