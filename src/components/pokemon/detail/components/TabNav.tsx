import React, { FunctionComponent } from "react";
import styled from "styled-components";

const TabNavDiv = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid rgb(225, 231, 236);
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.div<{ selected: boolean }>`
  padding: 0 1.25rem;
  color: ${(props) => (props.selected ? "#dd2020" : "grey")};
  text-transform: uppercase;
  cursor: pointer;
  transition: 100ms ease-out;
  font-weight: bold;
`;
interface IProps {
  current: string;
  tabs: string[];
  onTabChange: (newTab: string) => void;
}

const TabNav: FunctionComponent<IProps> = ({ current, tabs, onTabChange }) => {
  return (
    <TabNavDiv>
      {tabs.map((tab) => {
        return (
          <NavItem onClick={() => onTabChange(tab)} key={tab} selected={tab === current}>
            {tab}
          </NavItem>
        );
      })}
    </TabNavDiv>
  );
};

export default TabNav;
