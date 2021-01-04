import React, { FunctionComponent } from "react";
import { ColumnModel, LevelUpMove } from "types";
import Table from "./Table";
import { baseMoveColumns } from "./MoveTable";

interface IProps {
  moves: LevelUpMove[];
}

const columns: ColumnModel[] = [
  {
    name: "Level",
    fieldName: "level_learned_at",
  },
  ...baseMoveColumns,
];

const LevelUpMoveTable: FunctionComponent<IProps> = ({ moves }) => {
  return <Table data={moves} columns={columns} />;
};

export default LevelUpMoveTable;
