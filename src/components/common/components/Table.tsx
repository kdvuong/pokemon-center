import React, { useEffect, useCallback, useState, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import orderBy from "lodash-es/orderBy";
import { ColumnModel, DataObject, SortModel } from "shared/interfaces";
import { SortDirection } from "shared/enums";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Cell = styled.div<{ isMain?: boolean }>`
  flex: ${(props) => (props.isMain ? 2 : 1)};
  text-align: center;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
`;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  border-spacing: 0;
  /* border: 1px solid black; */
  width: 100%;
  height: 100%;
`;

const TableBody = styled.div`
  height: 100%;
`;

interface IProps<T> {
  data: T[];
  columns: ColumnModel<T>[];
  sortModel?: SortModel;
  renderRow?: (rowData: T, index: number, key: string, style: CSSProperties) => JSX.Element;
  rowHeight?: number;
  mainColumn?: string;
}

function Table<T extends DataObject>(props: IProps<T>) {
  const { data, columns, sortModel, renderRow, rowHeight, mainColumn } = props;
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortCategory, setSortCategory] = useState<string>(
    sortModel?.field ?? columns[0].fieldName
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    sortModel?.sortDirection ?? SortDirection.ASC
  );

  useEffect(() => {
    let newSortedData = data;
    const targetColumn = columns.find((c) => c.fieldName === sortCategory);

    if (data.length > 0 && targetColumn) {
      const { customSort } = targetColumn;
      newSortedData = orderBy(
        data,
        customSort ? [customSort.sortFunction, targetColumn.fieldName] : [targetColumn.fieldName],
        customSort ? [customSort.sortDirection, sortDirection] : [sortDirection]
      );
    }

    setSortedData(newSortedData);
  }, [columns, data, sortCategory, sortDirection]);

  const toggleSort = useCallback(
    (newSortCategory) => {
      let newSortDirection = SortDirection.ASC;
      if (newSortCategory === sortCategory) {
        newSortDirection =
          sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
      }
      setSortCategory(newSortCategory);
      setSortDirection(newSortDirection);
    },
    [sortCategory, sortDirection, setSortCategory, setSortDirection]
  );

  const Header = useMemo(() => {
    return (
      <Row>
        {columns.map((column) => (
          <Cell
            key={column.name}
            onClick={column.sortable ? () => toggleSort(column.fieldName) : undefined}
            isMain={column.name === mainColumn}
          >
            {column.name}
          </Cell>
        ))}
      </Row>
    );
  }, [columns, mainColumn, toggleSort]);

  const RenderRow = useCallback(
    (props: ListChildComponentProps) => {
      const { index, style } = props;
      const rowData = sortedData[index];
      if (!rowData) {
        return null;
      }
      const rowCells = columns.map((column) => {
        return (
          <Cell key={column.fieldName} isMain={column.name === mainColumn}>
            {rowData[column.fieldName]}
          </Cell>
        );
      });
      const rowKey = rowData.toString() + index;
      return (
        renderRow?.(rowData, index, rowKey, style) ?? (
          <Row key={rowKey} style={{ ...style }}>
            {rowCells}
          </Row>
        )
      );
    },
    [columns, mainColumn, renderRow, sortedData]
  );

  return (
    <StyledTable>
      {Header}
      {sortedData.length > 0 && (
        <TableBody>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <FixedSizeList
                  height={height}
                  itemCount={data.length}
                  itemSize={rowHeight ?? 35}
                  width={width}
                >
                  {RenderRow}
                </FixedSizeList>
              );
            }}
          </AutoSizer>
        </TableBody>
      )}

      {/* <tbody>{sortedData.length > 0 && sortedData.map(Row)}</tbody> */}
    </StyledTable>
  );
}

export default Table;
