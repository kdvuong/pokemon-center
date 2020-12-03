import React, { FunctionComponent, useState, useEffect } from "react";
import { PokemonSummary } from "types";
import Grid from "components/common/components/Grid";
import PokemonGridItem from "./PokemonGridItem";
import { useMediaQuery } from "react-responsive";

interface IProps {
  pokemons: PokemonSummary[];
}

const PokemonGrid: FunctionComponent<IProps> = ({ pokemons }) => {
  const [itemsPerRow, setItemsPerRow] = useState<number>(5);
  const isXSmallScreen = useMediaQuery({ query: "(max-width: 450px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 850px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1150px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1450px)" });
  useEffect(() => {
    if (isXSmallScreen) {
      setItemsPerRow(1);
    } else if (isSmallScreen) {
      setItemsPerRow(2);
    } else if (isMediumScreen) {
      setItemsPerRow(3);
    } else if (isLargeScreen) {
      setItemsPerRow(4);
    } else {
      setItemsPerRow(5);
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen, isXSmallScreen]);

  return <Grid items={pokemons} itemsPerRow={itemsPerRow} GridItem={PokemonGridItem} />;
};

export default PokemonGrid;
