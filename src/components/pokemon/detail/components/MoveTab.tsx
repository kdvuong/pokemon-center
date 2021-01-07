import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import TabView from "./TabView";
import { getAllLearnTypeNames, getLearnTypeFromName } from "utils/LearnTypeFilter";
import { LearnType } from "enums";
import usePokemonApi from "hooks/PokemonApiHook";
import { Moveset, PokemonMoveset } from "types";
import { $enum } from "ts-enum-util";
import LevelUpMoveTable from "./LevelUpMoveTable";
import MachineMoveTable from "./MachineMoveTable";
import MoveTable from "./MoveTable";
import styled from "styled-components";

interface IProps {
  movesetId: number;
}

const TableContainer = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 15px;
`;

const TableScroll = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const MoveTab: FunctionComponent<IProps> = ({ movesetId }) => {
  const { getMovesetById, getMovesByIds } = usePokemonApi();
  const [moveset, setMoveset] = useState<PokemonMoveset>({
    egg: [],
    level_up: [],
    machine: [],
    tutor: [],
  });

  useEffect(() => {
    getMovesetById(movesetId).then(async (moveset: Moveset) => {
      const eggMoves = await getMovesByIds(moveset.egg.map((move) => move.id));
      const levelUpMoves = await getMovesByIds(moveset["level_up"].map((move) => move.id));
      const machineMoves = await getMovesByIds(moveset.machine.map((move) => move.id));
      const tutorMoves = await getMovesByIds(moveset.tutor.map((move) => move.id));

      setMoveset({
        egg: eggMoves,
        level_up: levelUpMoves.map((move, index) => ({ ...moveset["level_up"][index], ...move })),
        machine: machineMoves,
        tutor: tutorMoves,
      });
    });
  }, [getMovesByIds, getMovesetById, movesetId]);

  const getTable = useCallback(
    (tab: string) => {
      const learnType = getLearnTypeFromName(tab);
      const table = $enum.mapValue(learnType).with({
        [LearnType.LEVEL_UP]: <LevelUpMoveTable moves={moveset[LearnType.LEVEL_UP]} />,
        [LearnType.EGG]: <MoveTable moves={moveset[LearnType.EGG]} />,
        [LearnType.MACHINE]: <MachineMoveTable moves={moveset[LearnType.MACHINE]} />,
        [LearnType.TUTOR]: <MoveTable moves={moveset[LearnType.TUTOR]} />,
      });
      return (
        <TableContainer className="container">
          <TableScroll>{table}</TableScroll>
        </TableContainer>
      );
    },
    [moveset]
  );

  return <TabView tabs={getAllLearnTypeNames()}>{(tab) => getTable(tab)}</TabView>;
};

export default MoveTab;
