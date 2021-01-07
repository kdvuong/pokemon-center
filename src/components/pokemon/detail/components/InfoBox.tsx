import React, { FunctionComponent } from "react";
import InfoItem from "./InfoItem";
import styled from "styled-components";

const StyledInfoBox = styled.div`
  background-color: #dd2020;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  color: white;
  padding: 1rem;
  justify-content: center;
`;

const InfoItemsWrapper = styled.div`
  height: 100%;
`;

interface IProps {
  height: number;
  weight: number;
  growth: string;
  gender: number;
  category: string;
  catchRate: number;
}

const InfoBox: FunctionComponent<IProps> = ({
  height,
  weight,
  growth,
  gender,
  category,
  catchRate,
}) => {
  const formatCategory = (category: string) => {
    return category.replace(" Pokémon", "");
  };
  return (
    <StyledInfoBox>
      <InfoItemsWrapper className="row no-gutters">
        <InfoItem label="Height" iconName="icon-height" description={`${height / 10} m`} />
        <InfoItem label="Weight" iconName="icon-weight" description={`${weight / 10} kg`} />
        <InfoItem label="Growth" iconName="icon-weight" description={`Medium Slow`} />
        <InfoItem label="Gender" iconName="icon-gender" description={`50% M / 50% F`} />
        <InfoItem
          label="Category"
          iconName="icon-weight"
          description={`${formatCategory(category)}`}
        />
        <InfoItem label="Catch Rate" iconName="icon-catch" description={`50%`} />
      </InfoItemsWrapper>
    </StyledInfoBox>
  );
};

export default InfoBox;
