import React, { FunctionComponent } from "react";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";

const GridContainer = styled.div`
  flex: 1 1 auto;
`;

interface IProps {
  items: any[];
  itemsPerRow: number;
  GridItem: FunctionComponent<GridChildComponentProps>;
}

const Grid: FunctionComponent<IProps> = ({ items, itemsPerRow, GridItem }) => {
  const getColumnWidth = (parentWidth: number) => {
    if (itemsPerRow > 1) {
      return parentWidth / itemsPerRow - 16 / itemsPerRow;
    } else {
      return parentWidth / itemsPerRow;
    }
  };

  return (
    <GridContainer>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            className="Grid"
            columnCount={itemsPerRow}
            columnWidth={getColumnWidth(width)}
            height={height}
            rowCount={Math.ceil(items.length / itemsPerRow)}
            rowHeight={120}
            width={width}
            itemData={{ items, itemsPerRow }}
            style={{ overflowX: "hidden", overflowY: "auto" }}
          >
            {GridItem}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </GridContainer>
  );
};

export default Grid;
