import React, { useState, useEffect, FunctionComponent, ReactNode } from "react";
import TabNav from "./TabNav";
import styled from "styled-components";

interface IProps {
  tabs: string[];
  children: (tab: string) => ReactNode;
}

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
`;

const TabTable: FunctionComponent<IProps> = (props) => {
  const { tabs, children } = props;
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Container>
      <TabNav current={currentTab} tabs={tabs} onTabChange={handleTabChange} />
      {children(currentTab)}
    </Container>
  );
};

export default TabTable;
