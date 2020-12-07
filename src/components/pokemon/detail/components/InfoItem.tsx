import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Description = styled.div`
  margin: 0.5rem;
  font-size: 14px;
  min-width: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  max-width: 33.333%;
  flex: 0 0 33.333%;

  @media (max-width: 600px) {
    max-width: 50%;
    flex: 0 0 50%;
  }
`;

interface IProps {
  label: string;
  description: string;
  iconName: string;
}

const InfoItem: FunctionComponent<IProps> = (props) => {
  const { label, description, iconName } = props;

  return (
    <Container>
      <div className="row no-gutters flex-nowrap justify-content-center flex-grow-1">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "0.5rem" }}
        >
          <i className={iconName} style={{ fontSize: "24px" }} />
        </div>
        <Description>
          <div>{label}</div>
          <div style={{ color: "rgba(255,255,255,0.7)" }}>{description}</div>
        </Description>
      </div>
    </Container>
  );
};

export default InfoItem;
