import React, { FunctionComponent } from "react";
import { ColumnModel, Move } from "types";
import Table from "./Table";

interface IProps {
  moves: Move[];
}

export const baseMoveColumns: ColumnModel[] = [
  {
    name: "Move",
    fieldName: "name",
  },
  {
    name: "Power",
    fieldName: "power",
  },
  {
    name: "Acc.",
    fieldName: "accuracy",
  },
  {
    name: "PP",
    fieldName: "pp",
  },
];

const MoveTable: FunctionComponent<IProps> = ({ moves }) => {
  return <Table data={moves} columns={baseMoveColumns} />;
};

export default MoveTable;
