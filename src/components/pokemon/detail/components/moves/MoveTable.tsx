import React, { FunctionComponent } from "react";
import { ColumnModel, Move } from "shared/interfaces";
import Table from "components/common/components/Table";

interface IProps {
  moves: Move[];
}

export const baseMoveColumns: ColumnModel[] = [
  {
    name: "Move",
    fieldName: "name",
    sortable: true,
  },
  {
    name: "Power",
    fieldName: "power",
    sortable: true,
  },
  {
    name: "Acc.",
    fieldName: "accuracy",
    sortable: true,
  },
  {
    name: "PP",
    fieldName: "pp",
    sortable: true,
  },
];

const MoveTable: FunctionComponent<IProps> = ({ moves }) => {
  return <Table data={moves} columns={baseMoveColumns} />;
};

export default MoveTable;
