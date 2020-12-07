import React, { FunctionComponent } from "react";
import Section from "./Section";
import StatsTable from "./StatsTable";
import TabTable from "./TabTable";
import styled from "styled-components";
import { Stat } from "types";

const StatsTableWrapper = styled.div`
  margin: 0 1rem;
`;

interface IProps {
  stats: Stat[];
}

const StatsSection: FunctionComponent<IProps> = ({ stats }) => {
  return (
    <Section title="Stats">
      {stats && (
        <TabTable tabs={["base", "min", "max"]}>
          {(tab) => (
            <StatsTableWrapper>
              <StatsTable type={tab} stats={stats} />
            </StatsTableWrapper>
          )}
        </TabTable>
      )}
    </Section>
  );
};

export default StatsSection;
