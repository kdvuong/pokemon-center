import { useAuth } from "hooks/AuthHook";
import React from "react";
import styled from "styled-components";
import AccountCard from "./AccountCard";

const Section = styled.div`
  margin-top: 1rem;
`;

const SettingsView = () => {
  const { isAuthenticated } = useAuth();

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
