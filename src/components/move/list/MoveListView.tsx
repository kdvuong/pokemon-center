import FilterBar from "components/common/components/FilterBar";
import { DamageClass, Generation, Type } from "enums";
import useFilter from "hooks/FilterHook";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FilterProps, Move } from "types";
import { DamageClassFilter } from "utils/DamageClassFilter";
import { GenerationFilter } from "utils/GenerationFilter";
import { TypeFilter } from "utils/TypeFilter";

const MoveListView = () => {
  const { getAllMoves } = usePokemonApi();
  const [searchValue, setSearchValue] = useState<string>("");
  const { filter: currentTypeFilter, onChange: onTypeChange } = useFilter<Type>(TypeFilter);
  const { filter: currentGenFilter, onChange: onGenerationChange } = useFilter<Generation>(
    GenerationFilter
  );
  const {
    filter: currentDamageClassFilter,
    onChange: onDamageClassChange,
  } = useFilter<DamageClass>(DamageClassFilter);

  const [moves, setMoves] = useState<Move[]>([]);
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([]);

  useEffect(() => {
    getAllMoves().then((moves) => {
      console.log(moves);
      setMoves(moves);
    });
  }, [getAllMoves]);

  useEffect(() => {
    const filtered = moves.filter((move) => {
      let searchValueMatched = searchValue ? move.name.startsWith(searchValue) : true;
      let genFilterMatched = currentGenFilter ? move.generation === currentGenFilter : true;
      let typeFilterMatched = currentTypeFilter ? move.type === currentTypeFilter : true;

      return searchValueMatched && genFilterMatched && typeFilterMatched;
    });
    setFilteredMoves(filtered);
  }, [currentGenFilter, currentTypeFilter, moves, searchValue]);

  const generationFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: GenerationFilter,
      currentItem: currentGenFilter,
      onChange: onGenerationChange,
    }),
    [currentGenFilter, onGenerationChange]
  );

  const typeFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: TypeFilter,
      currentItem: currentTypeFilter,
      onChange: onTypeChange,
    }),
    [currentTypeFilter, onTypeChange]
  );

  const damageClassFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: DamageClassFilter,
      currentItem: currentDamageClassFilter,
      onChange: onDamageClassChange,
    }),
    [currentDamageClassFilter, onDamageClassChange]
  );

  return (
    <Fragment>
      <FilterBar
        name="moves"
        filters={[typeFilterProps, generationFilterProps, damageClassFilterProps]}
        filteredCount={filteredMoves.length}
      />
    </Fragment>
  );
};

export default MoveListView;
