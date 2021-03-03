import usePokemonApi from "hooks/PokemonApiHook";
import React, { useCallback, useEffect, useState, FocusEvent, useRef } from "react";
import { Move, Pokemon, TeamPokemon } from "shared/interfaces";
import styled from "styled-components";
import { useDeepCallback } from "utils/useDeepCallback";
import { DisplaySection } from "../AddPokemonDrawer";
import MoveList from "../MoveList";
import MoveSlot from "../MoveSlot";

const MoveSlots = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex: 0 0 50%;
  }
`;

interface IMoveSlotsHook {
  selectedMoves: (Move | null)[];
  renderInput: () => JSX.Element;
  renderDisplaySection: () => JSX.Element;
}

export function useMoveSlots(
  drawerOpen: boolean,
  selectedPokemon: Pokemon | null,
  currentPokemon: TeamPokemon | null,
  updateDisplaySection: (newSection: DisplaySection) => void
): IMoveSlotsHook {
  const { getMovesByIds } = usePokemonApi();
  const [selectedMoves, setSelectedMoves] = useState<(Move | null)[]>(new Array(4));
  const [searchList, setSearchList] = useState<string[]>(["", "", "", ""]);
  const [activeMoveSlot, setActiveMoveSlot] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedPokemon) {
      if (currentPokemon?.pokemon_id === selectedPokemon.id) {
        getMovesByIds(currentPokemon.moves.filter((m) => m !== -1)).then((moves) => {
          // remapping moves to maintain correct order
          const currentMoves = currentPokemon.moves.map(
            (mId) => moves.find((m) => m.id === mId) ?? null
          );
          setSearchList(currentMoves.map((m) => m?.name ?? ""));
          setSelectedMoves(currentMoves);
        });
      } else {
        setSearchList(["", "", "", ""]);
        setSelectedMoves(new Array(4));
      }
    }
  }, [currentPokemon, drawerOpen, getMovesByIds, selectedPokemon]);

  useEffect(() => {
    if (drawerOpen) {
      setActiveMoveSlot(-1);
    }
  }, [drawerOpen]);

  const handleListRef = useCallback((el: HTMLDivElement) => {
    listRef.current = el;
  }, []);

  const handleSelectMove = useCallback(
    (move: Move) => {
      if (activeMoveSlot >= 0) {
        const existingIndex = selectedMoves.findIndex((m) => m?.id === move.id);
        const newList = [...selectedMoves];
        const newSearchList = [...searchList];
        if (existingIndex >= 0) {
          newList[existingIndex] = null;
          newSearchList[existingIndex] = "";
        }

        if (existingIndex !== activeMoveSlot) {
          newList[activeMoveSlot] = move;
          newSearchList[activeMoveSlot] = move.name;
          if (activeMoveSlot < 3) {
            setActiveMoveSlot(activeMoveSlot + 1);
          } else {
            setActiveMoveSlot(-1);
          }
        }
        setSelectedMoves(newList);
        setSearchList(newSearchList);
      }
    },
    [activeMoveSlot, searchList, selectedMoves]
  );

  const handleMoveSlotClick = useCallback(
    (index: number) => {
      updateDisplaySection(DisplaySection.MOVES);
      setActiveMoveSlot(index);
    },
    [updateDisplaySection]
  );

  const handleMoveSlotChange = useCallback(
    (value: string, index: number) => {
      const newList = [...searchList];
      newList[index] = value;
      setSearchList(newList);
    },
    [searchList]
  );

  const handleMoveSlotBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const activeMove = selectedMoves[activeMoveSlot];
      const newSearchList = [...searchList];
      if (activeMove) {
        newSearchList[activeMoveSlot] = activeMove.name;
        setSearchList(newSearchList);
      }

      // if related target is one of the move slots or inside move list then we click on it programmatically
      // else we reset the active move slot
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (
        relatedTarget &&
        (listRef.current?.contains(relatedTarget) ||
          inputContainerRef.current?.contains(relatedTarget))
      ) {
        relatedTarget.click();
      } else {
        setActiveMoveSlot(-1);
      }
    },
    [activeMoveSlot, searchList, selectedMoves]
  );

  const handleMoveSlotClear = useCallback(
    (index: number) => {
      const newList = [...selectedMoves];
      const newSearchList = [...searchList];
      newList[index] = null;
      newSearchList[index] = "";
      setSelectedMoves(newList);
      setSearchList(newSearchList);
    },
    [searchList, selectedMoves]
  );

  const renderInput = useCallback(() => {
    return (
      <div ref={inputContainerRef}>
        <span>Moves</span>
        <MoveSlots>
          {searchList.map((val, index) => (
            <div key={`slot-${index}`}>
              <MoveSlot
                value={val}
                slotNumber={index}
                active={activeMoveSlot === index}
                onClick={handleMoveSlotClick}
                onChange={handleMoveSlotChange}
                onBlur={handleMoveSlotBlur}
                onClear={handleMoveSlotClear}
                move={selectedMoves[index]}
              />
            </div>
          ))}
        </MoveSlots>
      </div>
    );
  }, [
    activeMoveSlot,
    handleMoveSlotBlur,
    handleMoveSlotChange,
    handleMoveSlotClear,
    handleMoveSlotClick,
    searchList,
    selectedMoves,
  ]);

  const renderDisplaySection = useDeepCallback(() => {
    return selectedPokemon ? (
      activeMoveSlot >= 0 && (
        <MoveList
          currentMove={selectedMoves[activeMoveSlot]}
          selectedMoves={selectedMoves}
          movesetId={selectedPokemon.moveset_id}
          onMoveClick={handleSelectMove}
          searchValue={activeMoveSlot >= 0 ? searchList[activeMoveSlot] : ""}
          onRef={handleListRef}
        />
      )
    ) : (
      <div>Loading...</div>
    );
  }, [activeMoveSlot, handleSelectMove, searchList, selectedMoves, selectedPokemon]);

  return {
    selectedMoves,
    renderInput,
    renderDisplaySection,
  };
}
