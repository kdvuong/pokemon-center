import { authContext } from "contexts/AuthContext";
import React, { useContext } from "react";
import styled from "styled-components";
import AccountCard from "./AccountCard";

const Section = styled.div`
  margin-top: 1rem;
`;

const SettingsView = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <div className="container">
      {isAuthenticated && (
        <Section>
          <AccountCard />
        </Section>
      )}
    </div>
  );
};

export default SettingsView;
