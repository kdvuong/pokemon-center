import React, { FunctionComponent } from "react";
import { Type } from "shared/enums";
import styled from "styled-components";
import { getTypeGradientColor, getTypeIconBoxShadow, getTypeIcon } from "utils/TypeFilter";

const Background = styled.div<{ type: Type; size: number; expanded: boolean }>`
  width: ${(props) => (props.expanded ? "auto" : `${props.size}px`)};
  height: ${(props) => `${props.size}px`};
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => getTypeGradientColor(props.type)};
  box-shadow: 0 0 10px 0 ${(props) => getTypeIconBoxShadow(props.type)};
  flex-direction: row;
`;

const Image = styled.img<{ size: number; expanded: boolean }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  ${(props) => props.expanded && "margin: 0 0.75rem"};
`;

const TypeName = styled.span`
  margin-right: 1rem;
  text-transform: uppercase;
  color: white;
`;

interface IProps {
  type: Type;
  size: number;
  expanded?: boolean;
}

const TypeIcon: FunctionComponent<IProps> = ({ type, size, expanded = false }) => {
  return (
    <Background type={type} size={size * 2} expanded={expanded} tabIndex={-1}>
      <Image src={getTypeIcon(type)} alt={`${type}-icon`} size={size} expanded={expanded} />
      {expanded && <TypeName>{type}</TypeName>}
    </Background>
  );
};

export default TypeIcon;
