import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

type Direction = "back" | "forward";

const ArrowContainer = styled.div<{ direction: Direction }>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: ${(props) => (props.direction === "back" ? "flex-start" : "flex-end")};
`;
const ArrowBackIcon = styled(ArrowBackIosRoundedIcon)`
  font-size: 3em;
`;

const ArrowForwardIcon = styled(ArrowForwardIosRoundedIcon)`
  font-size: 3em;
`;

const ArrowButton = styled.div`
  transform: scaleY(1.2);
  color: rgba(0, 255, 255, 0.5);
  transition: 200ms ease;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

interface IProps {
  direction: Direction;
  onClick: () => void;
}

const NavigationArrow: FunctionComponent<IProps> = ({ direction, onClick }) => {
  const getIcon = () => {
    return direction === "back" ? <ArrowBackIcon /> : <ArrowForwardIcon />;
  };

  return (
    <ArrowContainer direction={direction}>
      <ArrowButton onClick={onClick}>{getIcon()}</ArrowButton>
    </ArrowContainer>
  );
};

export default NavigationArrow;
