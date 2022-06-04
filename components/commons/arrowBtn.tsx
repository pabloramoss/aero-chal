import React from "react";
import styled from "styled-components";

import {theme} from "../../theme";

interface Props {
  readonly direction: keyof typeof directions;
  readonly color?: string;
}
const directions = {
  top: "180deg",
  bottom: "0deg",
  left: "90deg",
  right: "-90deg",
};

const ArrowContainer = styled.span<Props>`
  .arrow {
    transform: rotate(${(p) => directions[p.direction]});
  }
`;

const Arrow: React.FC<Props> = (props) => {
  return (
    <ArrowContainer direction={props.direction}>
      <svg
        className="arrow"
        fill="none"
        height="11"
        viewBox="0 0 20 11"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 2L10 9.5L2.5 2"
          stroke={props.color}
          strokeLinecap="square"
          strokeLinejoin="bevel"
          strokeWidth="2.5"
        />
      </svg>
    </ArrowContainer>
  );
};

Arrow.defaultProps = {
  color: theme.colors.gray500,
};

export default Arrow;
