import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AbilityNameLink = styled(Link)`
  padding: 0.25rem 0;
  margin: 1rem 1rem 0.5rem 1rem;
  background-color: #e1e7ec;
  color: #8895a7;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  justify-content: center;

  &:hover {
    color: #8895a7;
  }
`;

const AbilityEffectDiv = styled.div`
  color: #5f6b7a;
  text-align: left;
  margin: 0.5rem 1rem;
`;

interface IProps {
  id: number;
  name: string;
  effect: string;
}

const AbilityInfo: FunctionComponent<IProps> = ({ name, effect, id }) => {
  return (
    <div className="col-lg-4 text-center" key={name}>
      <AbilityNameLink to={`/abilities/${id}`}>
        <span>{name}</span>
      </AbilityNameLink>
      <AbilityEffectDiv>{effect}</AbilityEffectDiv>
    </div>
  );
};

export default AbilityInfo;
