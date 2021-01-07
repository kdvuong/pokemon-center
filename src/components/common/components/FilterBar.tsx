import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled/index.d";
import { FilterProps } from "types";
import ResponsiveSelect from "./ResponsiveSelect";
import { NavIcons } from "assets/icons";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div`
  height: 20px;
  margin-right: 16px;
`;

interface IProps {
  filters: FilterProps[];
}

const FilterBar: FunctionComponent<IProps> = ({ filters }) => {
  return (
    <StyledToolbar>
      <IconContainer>
        <img src={NavIcons.Pokeball} style={{ width: 20, height: 20 }} alt="pokeball-icon" />
      </IconContainer>
      <StyledDiv>
        {filters.map((filter) => (
          <ResponsiveSelect {...filter} key={filter.filter.getName()} />
        ))}
      </StyledDiv>
    </StyledToolbar>
  );
};

export default FilterBar;
