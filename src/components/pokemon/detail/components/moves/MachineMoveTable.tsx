import React, { FunctionComponent } from "react";
import { ColumnModel, Move } from "shared/interfaces";
import Table from "components/common/components/Table";
import { baseMoveColumns } from "./MoveTable";

interface IProps {
  moves: Move[];
}

const columns: ColumnModel[] = [
  {
    name: "TM",
    fieldName: "tm",
    sortable: true,
  },
  ...baseMoveColumns,
];

const MachineMoveTable: FunctionComponent<IProps> = ({ moves }) => {
  return <Table data={moves} columns={columns} />;
};

export default MachineMoveTable;
