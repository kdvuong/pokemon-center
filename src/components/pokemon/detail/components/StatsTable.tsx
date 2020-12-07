import React, { useState, useEffect, FunctionComponent, useCallback } from "react";
import maxBy from "lodash-es/maxBy";
import { toMinStats, toMaxStats } from "utils/statCalculator";
import { Stat } from "types";
import styled from "styled-components";

const Table = styled.table`
  table-layout: fixed;

  th,
  td {
    padding: 4px 10px;
    font-size: 0.875rem;
    font-weight: normal;
    text-align: right;
  }
`;

const Row = styled.tr<{ index: number }>`
  height: 33px;
  box-sizing: border-box;
  border-width: 1px 0;
  border-style: solid;
  border-color: #f0f0f0;
  ${(props) => props.index === 0 && "border: none;"}
`;

const StatName = styled.th`
  color: #737373;
`;

const StatValue = styled.td`
  color: black;
  min-width: 50px;
`;

const StatBarContainer = styled.td`
  width: 100%;
  height: 0.75rem;
`;

const StatBar = styled.div<{ ratio: number }>`
  height: 0.8rem;
  width: 100%;
  background-color: #ddedff;
  border-radius: 10px;

  div {
    width: ${(props) => `${props.ratio}%`};
    background-color: #0999fe;
    height: 0.8rem;
    border-radius: 10px;
    transition: 300ms ease-in-out;
  }
`;

interface IProps {
  stats: Stat[];
  type: string;
}

const StatsTable: FunctionComponent<IProps> = (props) => {
  const { stats: baseStats, type } = props;
  const [stats, setStats] = useState(baseStats);
  const [maxValue, setMaxValue] = useState((maxBy(baseStats, "value") ?? baseStats[0]).value);

  useEffect(() => {
    setStats(baseStats);
  }, [baseStats]);

  useEffect(() => {
    let newStats = baseStats;
    if (type === "base") {
      newStats = baseStats;
    } else if (type === "min") {
      newStats = baseStats.map(toMinStats);
    } else if (type === "max") {
      newStats = baseStats.map(toMaxStats);
    }
    setStats(newStats);
    setMaxValue((maxBy(newStats, "value") ?? newStats[0]).value);
  }, [baseStats, type]);

  const formatName = (name: string) => {
    switch (name) {
      default:
        return;
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
    }
  };

  const scaleLength = useCallback(
    (value: number) => {
      const length = (value / maxValue) * 100;
      return length;
    },
    [maxValue]
  );

  return (
    <Table>
      <tbody>
        {[...stats].map((stat, index) => (
          <Row key={stat.name} index={index}>
            <StatName>{formatName(stat.name)}</StatName>
            <StatValue>{stat.value}</StatValue>
            <StatBarContainer>
              <StatBar ratio={scaleLength(stat.value)}>
                <div />
              </StatBar>
              {/* <div
                  className={"bar fill"}
                  style={{ width: `${scaleLength(stat.value)}%` }}
                />
                <div
                  className="bar fill-bg"
                  style={{ width: `${100 - scaleLength(stat.value)}%` }}
                /> */}
            </StatBarContainer>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

export default StatsTable;
