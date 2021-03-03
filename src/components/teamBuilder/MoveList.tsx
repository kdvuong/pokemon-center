import Table from "components/common/components/Table";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { CSSProperties, FunctionComponent, useEffect, useMemo, useState } from "react";
import { ColumnModel, Move, MoveSummary } from "shared/interfaces";
import styled from "styled-components";

const TableScroll = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
`;

const StyledRow = styled.div<{ selected: boolean }>`
  border: 1px solid ${(props) => (props.selected ? "red" : "black")};
  display: flex;
  margin: 1rem 0;
`;

const Cell = styled.div`
  flex: 1;
  text-transform: capitalize;
`;

interface IProps {
  currentMove: MoveSummary | null;
  selectedMoves: (MoveSummary | null)[];
  movesetId: number;
  searchValue: string;
  onMoveClick: (move: Move) => void;
  onRef: (el: HTMLDivElement) => void;
}

const MoveList: FunctionComponent<IProps> = ({
  currentMove,
  selectedMoves,
  movesetId,
  searchValue,
  onMoveClick,
  onRef,
}) => {
  const selectedMoveIds = useMemo(() => selectedMoves.map((m) => m?.id), [selectedMoves]);
  const columns: ColumnModel<Move>[] = [
    {
      name: "Move",
      fieldName: "name",
      sortable: true,
    },
    {
      name: "Type",
      fieldName: "type",
      sortable: true,
    },
  ];

  const { getMovesetById, getMovesByIds } = usePokemonApi();
  const [moves, setMoves] = useState<Move[]>([]);
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([]);

  useEffect(() => {
    getMovesetById(movesetId)
      .then((moveset) => {
        return Array.from(
          new Set(
            [...moveset.egg, ...moveset.level_up, ...moveset.machine, ...moveset.tutor].map(
              (m) => m.id
            )
          )
        );
      })
      .then((ids) => {
        getMovesByIds(ids).then((moves) => setMoves(moves));
      });
  }, [getMovesByIds, getMovesetById, movesetId]);

  useEffect(() => {
    const filtered =
      currentMove?.name.toLowerCase() === searchValue.toLowerCase()
        ? moves
        : moves.filter((move) =>
            searchValue
              ? move.name
                  .toLowerCase()
                  .replace(/-|\s/g, "")
                  .startsWith(searchValue.toLowerCase().replace(/-|\s/g, ""))
              : true
          );
    setFilteredMoves(filtered);
  }, [currentMove, moves, searchValue]);

  const formatName = (name: string) => {
    return name.replace("-", " ");
  };

  const renderRow = (move: Move, index: number, key: string, style: CSSProperties) => {
    const selected = selectedMoveIds.includes(move.id);
    return (
      <StyledRow
        key={key}
        onClick={() => onMoveClick(move)}
        style={{ ...style }}
        tabIndex={1}
        selected={selected}
      >
        <Cell>
          {formatName(move.name)}
          {selected && "*"}
        </Cell>
        <Cell>{move.type}</Cell>
      </StyledRow>
    );
  };

  return (
    <TableScroll ref={onRef}>
      <Table columns={columns} data={filteredMoves} renderRow={renderRow} rowHeight={50} />
    </TableScroll>
  );
};

export default MoveList;
