import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div<{ isClickable: boolean }>`
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  position: relative;
`;

interface IProps {
  onClick?: () => void;
  hover?: boolean;
}

const Card: FunctionComponent<IProps> = ({ children, onClick, hover }) => {
  return (
    <Container
      onClick={onClick}
      className={`${hover ? "gradient-hover" : ""}`}
      isClickable={onClick ? true : false}
    >
      {children}
    </Container>
  );
};

export default Card;
