import React, { FunctionComponent } from "react";
import { Type } from "enums";
import styled from "styled-components";
import { getTypeIconColor } from "utils/TypeFilter";

const Background = styled.div<{ type: Type; size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => getTypeIconColor(props.type)};
`;

const Image = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;

interface IProps {
  type: Type;
  size: number;
}

const TypeIcon: FunctionComponent<IProps> = ({ type, size }) => {
  return (
    <Background type={type} size={size + 10}>
      <Image src={require(`assets/icons/svg/${type}-icon.svg`)} alt={`${type}-icon`} size={size} />
    </Background>
  );
};

export default TypeIcon;
