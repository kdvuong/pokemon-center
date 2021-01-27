import FilterBar from "components/common/components/FilterBar";
import SearchBar from "components/common/components/SearchBar";
import { DamageClass, Generation, Type } from "shared/enums";
import useFilter from "hooks/FilterHook";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import { FilterProps, Move } from "shared/interfaces";
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
      setMoves(moves);
    });
  }, [getAllMoves]);

  useEffect(() => {
    const filtered = moves.filter((move) => {
      let searchValueMatched = searchValue ? move.name.startsWith(searchValue) : true;
      let genFilterMatched = currentGenFilter ? move.generation === currentGenFilter : true;
      let typeFilterMatched = currentTypeFilter ? move.type === currentTypeFilter : true;
      let damageClassFilterMatched = currentDamageClassFilter
        ? move.damage_class === currentDamageClassFilter
        : true;

      return (
        searchValueMatched && genFilterMatched && typeFilterMatched && damageClassFilterMatched
      );
    });
    setFilteredMoves(filtered);
  }, [currentDamageClassFilter, currentGenFilter, currentTypeFilter, moves, searchValue]);

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

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Fragment>
      <SearchBar
        name="moves"
        count={filteredMoves.length}
        placeholder={"Search by name or effect"}
        onChange={handleSearchInputChange}
      />
      <FilterBar filters={[typeFilterProps, generationFilterProps, damageClassFilterProps]} />
      <div style={{ height: "100%", overflowY: "scroll" }}>
        {filteredMoves.map((move) => {
          return <div>{move.name}</div>;
        })}
      </div>
    </Fragment>
  );
};

export default MoveListView;
