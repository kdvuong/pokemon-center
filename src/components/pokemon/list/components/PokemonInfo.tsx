import { Type } from "shared/enums";
import React, { FunctionComponent } from "react";
import TypeIcon from "../../../common/components/TypeIcon";
import styled from "styled-components";

const InfoContainer = styled.div`
  padding: 0;
  transition: all 200ms linear;
  text-align: left;
  flex: 1;
`;

const Id = styled.p`
  color: grey;
  margin-top: 0.5rem;
  margin-left: 12px;
  margin-bottom: 0;

  span {
    background: #ebeaeb;
    padding: 0 8px;
    border-radius: 10px;
    font-family: "Titillium Web", sans-serif;
  }
`;

const Name = styled.h5`
  text-transform: capitalize;
  font-size: 1rem;
  padding: 0 !important;
  margin-top: 0.5rem;
  margin-left: 12px;
  margin-bottom: 0;
  font-weight: 500;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.75rem 0;
`;

const IconContainer = styled.div`
  width: 25px;
  height: 25px;
  margin-top: 0.5rem;
  margin-left: 12px;
  transition: all 200ms cubic-bezier(0.515, 0.09, 0.605, 1.65);
`;

interface IProps {
  id: number;
  name: string;
  types: Type[];
}

const PokemonInfo: FunctionComponent<IProps> = ({ id, name, types }) => {
  return (
    <InfoContainer>
      <Id>
        <span>#{id.toString().padStart(3, "0")}</span>
      </Id>
      <Name>{name}</Name>
      <Icons>
        {types.map((type) => (
          <IconContainer key={`${id}-${type}`}>
            <TypeIcon type={type} size={14} />
          </IconContainer>
        ))}
      </Icons>
    </InfoContainer>
  );
};

export default PokemonInfo;
