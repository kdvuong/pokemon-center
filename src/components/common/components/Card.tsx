import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid grey;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  border-radius: 10px;
`;

interface IProps {
  onClick?: () => void;
}

const Card: FunctionComponent<IProps> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default Card;
