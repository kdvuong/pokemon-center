import { PokemonType } from "shared/interfaces";
import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import Section from "../shared/Section";
import { Type } from "shared/enums";
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
  const weakAgainstRef = useRef<Type[]>([]);
  const resistAgainstRef = useRef<Type[]>([]);
  const normalRef = useRef<Type[]>([]);

  useEffect(() => {
    let isSubscribed: boolean = true;
    getTypesByIds(types.map((t) => t.id)).then((typeData) => {
      if (!isSubscribed) {
        return;
      }
      const map: Map<Type, number> = new Map();
      const weakAgainst: Type[] = [];
      const resistAgainst: Type[] = [];
      const normal: Type[] = [];
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
            weakAgainst.push(type);
          } else if (multiplier < 1) {
            resistAgainst.push(type);
          } else {
            normal.push(type);
          }
        });
      mapRef.current = map;
      weakAgainstRef.current = weakAgainst;
      resistAgainstRef.current = resistAgainst;
      normalRef.current = normal;
    });
    return () => {
      isSubscribed = false;
    };
  }, [getTypesByIds, types]);
  return (
    <div className="container">
      <Section title={"Weak Against"}>
        <TypePillContainers>
          {weakAgainstRef.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Resistant Against"}>
        <TypePillContainers>
          {resistAgainstRef.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
      <Section title={"Normal Damage From"}>
        <TypePillContainers>
          {normalRef.current.map((type) => (
            <TypeMultiplierPill type={type} multiplier={mapRef.current.get(type) ?? 1} />
          ))}
        </TypePillContainers>
      </Section>
    </div>
  );
};

export default MatchupTab;
