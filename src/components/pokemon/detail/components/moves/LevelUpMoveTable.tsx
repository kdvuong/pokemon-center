import React, { FunctionComponent } from "react";
import { ColumnModel, LevelUpMove } from "shared/interfaces";
import Table from "components/common/components/Table";
import { baseMoveColumns } from "./MoveTable";

interface IProps {
  moves: LevelUpMove[];
}

const columns: ColumnModel[] = [
  {
    name: "Level",
    fieldName: "level_learned_at",
    sortable: true,
  },
  ...baseMoveColumns,
];

const LevelUpMoveTable: FunctionComponent<IProps> = ({ moves }) => {
  return <Table data={moves} columns={columns} />;
};

export default LevelUpMoveTable;
