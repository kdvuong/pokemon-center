import React, { FunctionComponent, useContext } from "react";
import { accountContext } from "contexts/AccountContext";
import styled from "styled-components";
import UserField from "./UserField";

const Card = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: rgb(242, 243, 245);
`;

const Title = styled.h2`
  span:nth-child(1) {
    font-weight: bold;
    color: black;
    font-size: 1.2rem;
  }
  span:nth-child(2) {
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.1rem;
  }
`;

const AccountInfoCard = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 10px;
`;

const AccountCard: FunctionComponent = () => {
  const { username } = useContext(accountContext);

  const currentName = username?.name ?? "";
  const currentDiscriminator = username?.discriminator.toString() ?? "";

  return (
    <Card>
      <Title>
        <span>{currentName}</span>
        <span>{`#${currentDiscriminator}`}</span>
      </Title>
      <AccountInfoCard>
        <UserField />
      </AccountInfoCard>
    </Card>
  );
};

export default AccountCard;
