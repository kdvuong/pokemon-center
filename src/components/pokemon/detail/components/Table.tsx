import React, { useEffect, useCallback, useState, FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import orderBy from "lodash-es/orderBy";
import { ColumnModel, DataObject, SortModel } from "types";
import { SortDirection } from "enums";

const StyledHeaderCell = styled.th`
  position: sticky;
`;

const StyledTable = styled.table`
  width: 100%;
  thead tr:nth-child(1) th {
    background: #fafafa;
    position: sticky;
    top: 0;
    z-index: 10;
  }
`;

interface IProps {
  data: DataObject[];
  columns: ColumnModel[];
  sortModel?: SortModel;
}

const Table: FunctionComponent<IProps> = (props) => {
  const { data, columns, sortModel } = props;
  const [sortedData, setSortedData] = useState<DataObject[]>(data);
  const [sortCategory, setSortCategory] = useState<string>(
    sortModel?.field ?? columns[0].fieldName
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    sortModel?.sortDirection ?? SortDirection.ASC
  );

  useEffect(() => {
    // we use switch block because we don't want to be strongly coupled with the field names of move.
    let newSortedData = data;
    const targetColumn = columns.find((c) => c.fieldName === sortCategory);

    if (data.length > 0 && targetColumn) {
      newSortedData = orderBy(
        data,
        [targetColumn.sortFunction ?? targetColumn.fieldName],
        [sortDirection]
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
    return columns.map((column) => (
      <StyledHeaderCell
        key={column.name}
        onClick={column.sortable ? () => toggleSort(column.fieldName) : undefined}
      >
        {column.name}
      </StyledHeaderCell>
    ));
  }, [columns, toggleSort]);

  return (
    <StyledTable>
      <thead>
        <tr>{Header}</tr>
      </thead>
      <tbody>
        {sortedData.length > 0 &&
          sortedData.map((datum, index) => (
            <tr key={datum.toString() + index}>
              {columns.map((column) => {
                return <td key={column.fieldName}>{datum[column.fieldName]}</td>;
              })}
            </tr>
          ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
