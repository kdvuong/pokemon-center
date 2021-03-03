import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { StyledToolbar } from "components/common/styled/index.d";
import { FilterProps } from "shared/interfaces";
import ResponsiveSelect, { AnchorProps } from "./ResponsiveSelect";
import { NavIcons } from "assets/icons";
import { ButtonBase } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div`
  height: 20px;
  margin-right: 16px;
`;

const StyledButton = styled(ButtonBase)`
  border-radius: 10px !important;
  color: #203e55;
  font-weight: bold;
  transition: all 50ms ease-in-out;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;

  span {
    padding-left: 10px;
  }
`;

const Arrow = styled(({ active, ...props }) => <ArrowDropDown {...props} />)`
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0)")};
  transition: all 200ms ease-in-out;
`;

interface IProps {
  filters: FilterProps[];
}

const FilterBar: FunctionComponent<IProps> = ({ filters }) => {
  const renderButton = (anchorProps: AnchorProps) => {
    const { active, onClick, onRef, currentName } = anchorProps;
    return (
      <StyledButton onClick={onClick} ref={onRef}>
        <ButtonContent>
          <span>{currentName}</span>
          <Arrow active={active} />
        </ButtonContent>
      </StyledButton>
    );
  };

  return (
    <StyledToolbar>
      <IconContainer>
        <img src={NavIcons.Pokeball} style={{ width: 20, height: 20 }} alt="pokeball-icon" />
      </IconContainer>
      <StyledDiv>
        {filters.map((filter) => (
          <ResponsiveSelect {...filter} key={filter.filter.getName()} renderAnchor={renderButton} />
        ))}
      </StyledDiv>
    </StyledToolbar>
  );
};

export default FilterBar;
