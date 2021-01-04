import React, { FunctionComponent } from "react";
import Section from "./Section";
import StatsTable from "./StatsTable";
import TabView from "./TabView";
import styled from "styled-components";
import { Stats } from "types";

const StatsTableWrapper = styled.div`
  margin: 0 1rem;
`;

interface IProps {
  stats: Stats;
}

const StatsSection: FunctionComponent<IProps> = ({ stats }) => {
  return (
    <Section title="Stats">
      {stats && (
        <TabView tabs={["base", "min", "max"]}>
          {(tab) => (
            <StatsTableWrapper>
              <StatsTable type={tab} stats={stats} />
            </StatsTableWrapper>
          )}
        </TabView>
      )}
    </Section>
  );
};

export default StatsSection;
