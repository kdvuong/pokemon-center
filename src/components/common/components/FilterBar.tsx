import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled/index.d";
import { Filter } from "types";
import ResponsiveSelect from "./ResponsiveSelect";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

interface IProps {
  filters: Filter[];
  filteredCount: number;
}

const FilterBar: FunctionComponent<IProps> = ({ filters, filteredCount }) => {
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
          <ResponsiveSelect {...filter} />
        ))}
        {/* <FilterCount>
          <span>{filteredCount} Pokemons</span>
        </FilterCount> */}
      </StyledDiv>
    </StyledToolbar>
  );
};

export default FilterBar;
