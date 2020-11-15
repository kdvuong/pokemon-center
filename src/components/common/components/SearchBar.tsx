import React, { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #e1e7ec;
`;

const FilterIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
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

interface IProps {
  onChange: (input: string) => void;
}

const SearchBar: FunctionComponent<IProps> = ({ onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledToolbar>
      <StyledDiv>
        <FilterIcon>
          <img
            src={require("assets/icons/svg/search.svg")}
            style={{ width: 18, height: 18 }}
            alt="search-icon"
          />
        </FilterIcon>
        <SearchInputContainer>
          <SearchInput placeholder="Enter name" onChange={handleChange} />
        </SearchInputContainer>
      </StyledDiv>
    </StyledToolbar>
  );
};

export default SearchBar;
