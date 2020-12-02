import React, { FunctionComponent } from "react";
import { PokemonSummary } from "types";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridContainer = styled.div`
  flex: 1 1 auto;
`;

interface IProps {
  pokemons: PokemonSummary[];
}

interface GridItemProps<T> extends GridChildComponentProps {
  data: {
    items: T[];
    itemsPerRow: number;
  };
}

const GridItem: FunctionComponent<GridItemProps<PokemonSummary>> = (props) => {
  const { data, columnIndex, rowIndex, style } = props;
  const item = data.items[rowIndex * data.itemsPerRow + columnIndex];
  console.log(item);
  if (!item) return <span></span>;
  return (
    <Link
      to={{
        pathname: `/pokemons/${item.id}`,
      }}
      className="custom-link"
      key={item.name}
      style={style}
    >
      {item.name}
    </Link>
  );
};

const PokemonList: FunctionComponent<IProps> = ({ pokemons }) => {
  const itemsPerRow = 5;
  console.log(pokemons);
  return (
    <GridContainer>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            className="Grid"
            columnCount={itemsPerRow}
            columnWidth={width / itemsPerRow}
            height={height}
            rowCount={Math.ceil(pokemons.length / itemsPerRow)}
            rowHeight={114}
            width={width}
            itemData={{ items: pokemons, itemsPerRow: itemsPerRow }}
            style={{ overflowX: "hidden" }}
          >
            {GridItem}
          </Grid>
        )}
      </AutoSizer>
    </GridContainer>
  );
};

export default PokemonList;
