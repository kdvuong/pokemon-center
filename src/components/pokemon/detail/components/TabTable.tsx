import React, { useState, useEffect, FunctionComponent, ReactNode } from "react";
import TabNav from "./TabNav";

interface IProps {
  tabs: string[];
  children: (tab: string) => ReactNode;
}

const TabTable: FunctionComponent<IProps> = (props) => {
  const { tabs, children } = props;
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <div>
      <TabNav current={currentTab} tabs={tabs} onTabChange={handleTabChange} />
      {children(currentTab)}
    </div>
  );
};

export default TabTable;
