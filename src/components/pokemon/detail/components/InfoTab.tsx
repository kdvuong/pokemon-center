import React, { useEffect, FunctionComponent, UIEvent } from "react";
import Section from "./Section";
import DescriptionSection from "./DescriptionSection";
import AbilitySection from "./AbilitySection";
import StatsSection from "./StatsSection";
import InfoBox from "./InfoBox";
import { Stat } from "types";

interface IProps {
  id: number;
}

const data = {
  height: 100,
  weight: 100,
  category: "Grass",
  description:
    "A very long description as a place holder. Hello world! This is bulbasaur, your frog...",
  abilities: [
    {
      id: 1,
      name: "speedy boi",
      description: "Fast",
      effect: "increase speed",
      in_depth_effect: "become very fast",
      is_hidden: false,
    },
  ],
  stats: [
    {
      name: "hp",
      value: 252,
    },
    {
      name: "attack",
      value: 252,
    },
    {
      name: "defense",
      value: 252,
    },
    {
      name: "special-attack",
      value: 252,
    },
    {
      name: "special-defense",
      value: 252,
    },
    {
      name: "speed",
      value: 252,
    },
  ],
};

const InfoTab: FunctionComponent<IProps> = ({ id }) => {
  const { height, weight, category, description, abilities, stats } = data;

  return (
    <div>
      <InfoBox
        height={height}
        weight={weight}
        category={category}
        growth={"fast"}
        gender={1}
        catchRate={50}
      />
      <DescriptionSection description={description} />
      <AbilitySection abilities={abilities} />
      <StatsSection stats={stats as Stat[]} />
    </div>
  );
};

export default InfoTab;
