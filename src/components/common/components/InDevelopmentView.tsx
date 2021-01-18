import { withDrawerContext } from "contexts/Drawer.context";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  flex-direction: column;
  height: 70%;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 3rem;
`;

const Body = styled.p`
  padding: 1rem;
  font-size: 1.5rem;
`;

const InDevelopmentView: FunctionComponent = () => {
  return (
    <Container className="container">
      <Header>In Development</Header>
      <Body>Sorry, this page is still in development. It will be available soon!</Body>
    </Container>
  );
};

export default InDevelopmentView;
