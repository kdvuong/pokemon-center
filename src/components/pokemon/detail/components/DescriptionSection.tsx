import React, { FunctionComponent } from "react";
import Section from "./Section";
import styled from "styled-components";

const StyledDescription = styled.p`
  margin: 1rem 4rem;
  color: #5f6b7a;
`;

interface IProps {
  description: string;
}

const DescriptionSection: FunctionComponent<IProps> = ({ description }) => {
  return (
    <Section title="Description">
      <StyledDescription>{description}</StyledDescription>
    </Section>
  );
};

export default DescriptionSection;
