import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled";
import { Filter } from "types";
import ResponsiveSelect from "./ResponsiveSelect";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

interface IProps {
  filters: Filter<string>[];
  onChange: (value: string) => void;
  filteredCount: number;
}

const FilterBar: FunctionComponent<IProps> = ({
  filters,
  onChange,
  filteredCount,
}) => {
  return (
    <StyledToolbar>
      {/* result bar */}
      <div className="filter-icon">
        <img
          src={require("assets/icons/svg/pokeball.svg")}
          style={{ width: 18, height: 18 }}
          alt="filter-icon"
        />
      </div>
      <StyledDiv>
        {filters.map((filter) => (
          <ResponsiveSelect
            name={filter.name}
            currentItem={filter.currentItem}
            allItems={filter.items}
            onChange={onChange}
            key={filter.name}
          />
        ))}
        {/* <FilterCount>
          <span>{filteredCount} Pokemons</span>
        </FilterCount> */}
      </StyledDiv>
    </StyledToolbar>
  );
};

export default FilterBar;
