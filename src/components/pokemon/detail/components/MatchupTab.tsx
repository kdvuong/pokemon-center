import { PokemonType } from "types";
import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import Section from "./Section";
import { Type } from "enums";
import { $enum } from "ts-enum-util";
import usePokemonApi from "hooks/PokemonApiHook";
import TypeMultiplierPill from "./TypeMultiplierPill";

interface IProps {
  types: PokemonType[];
}

const TypePillContainers = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MatchupTab: FunctionComponent<IProps> = ({ types }) => {
  const { getTypesByIds } = usePokemonApi();
  const mapRef = useRef<Map<Type, number>>(new Map());
  const weakAgainst = useRef<Type[]>([]);
  const resistAgainst = useRef<Type[]>([]);
  const normal = useRef<Type[]>([]);

  useEffect(() => {
    mapRef.current = new Map();
    weakAgainst.current = [];
    resistAgainst.current = [];
    normal.current = [];
    getTypesByIds(types.map((t) => t.id)).then((typeData) => {
      const map = mapRef.current;
      $enum(Type)
        .getValues()
        .forEach((type) => {
          typeData.forEach((data) => {
            let multiplier = map.get(type);
            if (multiplier === undefined || multiplier === null) {
              multiplier = 1;
            }
            const { half_damage_from, double_damage_from, no_damage_from } = data.damage_relations;
            if (half_damage_from.includes(type)) {
              multiplier /= 2;
            } else if (double_damage_from.includes(type)) {
              multiplier *= 2;
            } else if (no_damage_from.includes(type)) {
              multiplier = 0;
            }
            map.set(type, multiplier);
          });
          let multiplier = map.get(type);
          if (multiplier === undefined || multiplier === null) {
            multiplier = 1;
          }
          if (multiplier > 1) {
            weakAgainst.current.push(type);
          } else if (multiplier < 1) {
            resistAgainst.current.push(type);
          } else {
            normal.current.push(type);
          }
        });
    });
  }, [getTypesByIds, types]);
  return (
    <div className="container">
      <Section title={"Weak Against"}>
        <TypePillContainers>
          {weakAgainst.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Resistant Against"}>
        <TypePillContainers>
          {resistAgainst.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Normal Damage From"}>
        <TypePillContainers>
          {normal.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
    </div>
  );
};

export default MatchupTab;
