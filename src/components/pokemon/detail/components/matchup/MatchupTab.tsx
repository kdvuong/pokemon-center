import { PokemonType } from "shared/interfaces";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Section from "../shared/Section";
import TypeMultiplierPill from "./TypeMultiplierPill";
import { useTypeMultiplier } from "hooks/TypeMultiplierHook";

interface IProps {
  types: PokemonType[];
}

const TypePillContainers = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MatchupTab: FunctionComponent<IProps> = ({ types }) => {
  const { map, weakAgainst, resistAgainst, normal } = useTypeMultiplier(types.map((t) => t.id));

  return (
    <div className="container">
      <Section title={"Weak Against"}>
        <TypePillContainers>
          {weakAgainst.map((type) => (
            <TypeMultiplierPill type={type} multiplier={map.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Resistant Against"}>
        <TypePillContainers>
          {resistAgainst.map((type) => (
            <TypeMultiplierPill type={type} multiplier={map.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Normal Damage From"}>
        <TypePillContainers>
          {normal.map((type) => (
            <TypeMultiplierPill type={type} multiplier={map.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
    </div>
  );
};

export default MatchupTab;
