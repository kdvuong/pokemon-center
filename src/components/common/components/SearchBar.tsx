import React, { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled/index.d";
import { NavIcons } from "assets/icons";

const Toolbar = styled(StyledToolbar)`
  padding: 8px !important;
`;

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #e1e7ec;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: all 200ms ease-out;
  &:focus-within {
    border: 1px solid #e1e7ec;
    background: white;
    box-shadow: 0px 0px 10px #e1e7ec;
  }
`;

const FilterIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 8px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  flex-grow: 10;
`;

const SearchInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  padding: 10px;
  text-align: left;
`;

const FilterCount = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
  span {
    text-transform: capitalize;
  }
  margin-right: 8px;
`;

interface IProps {
  name: string;
  count: number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FunctionComponent<IProps> = ({
  name,
  count,
  onChange,
  placeholder = "Enter name",
}) => {
  return (
    <Toolbar>
      <StyledDiv>
        <FilterIcon>
          <img src={NavIcons.Search} style={{ width: 18, height: 18 }} alt="search-icon" />
        </FilterIcon>
        <SearchInputContainer>
          <SearchInput placeholder={placeholder} onChange={onChange} />
        </SearchInputContainer>
        <FilterCount>
          <span>{`${count} ${name}`}</span>
        </FilterCount>
      </StyledDiv>
    </Toolbar>
  );
};

export default SearchBar;
