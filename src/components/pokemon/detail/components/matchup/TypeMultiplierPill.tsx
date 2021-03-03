import { Type } from "shared/enums";
import React, { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { getTypeGradientColor } from "utils/TypeFilter";

const Pill = styled.div<{ type: Type }>`
  position: relative;
  display: flex;
  flex: 1;
  background-image: ${(props) => getTypeGradientColor(props.type)};
  min-width: calc(100% / 3 - 16px);
  margin: 0 8px;
  margin-top: 1rem;
  height: 32px;
  justify-content: center;
  align-items: center;
  font-family: "Nunito Sans";
  color: white;
  border-radius: 32px;
  @media (max-width: 750px) {
    min-width: calc(100% / 2 - 16px);
  }
`;

const TypeName = styled.div`
  display: flex;
  text-transform: uppercase;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Multiplier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0 32px 32px 0;
  font-size: 0.75rem;
`;

interface IProps {
  type: Type;
  multiplier: number;
}

const TypeMultiplierPill: FunctionComponent<IProps> = ({ type, multiplier }) => {
  const fractionMultiplier = useMemo(() => {
    if (multiplier === 0 || multiplier >= 1) {
      return multiplier.toString();
    } else {
      const denominator = 1 / multiplier;
      return `1/${denominator}`;
    }
  }, [multiplier]);

  return (
    <Pill type={type}>
      <TypeName>{type}</TypeName>
      <Multiplier>x{fractionMultiplier}</Multiplier>
    </Pill>
  );
};

export default TypeMultiplierPill;
