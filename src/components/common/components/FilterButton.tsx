import React, { FunctionComponent, MouseEvent } from "react";
import { Filter, FilterType } from "types";
import ButtonBase from "@material-ui/core/ButtonBase";
import styled from "styled-components";

const StyledButton = styled(ButtonBase)<{ selected: boolean; background: string; color: string }>`
  border-radius: 5px !important;
  color: ${(props) => props.color} !important;
  background: ${(props) => props.background} !important;
  transition: all 150ms ease-in-out !important;
  min-width: 160px !important;
  margin: 3px 0 !important;
  border: 2px solid transparent !important;
  ${(props) =>
    props.selected &&
    `background: transparent !important; border: 2px solid ${props.background} !important; color: ${props.background} !important;`}
  &:hover {
    background: transparent !important;
    border: 2px solid ${(props) => props.background} !important;
    color: ${(props) => props.background} !important;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  justify-content: center;
  font-family: "Nunito Sans";
`;

interface IProps {
  item: FilterType | null;
  filter: Filter<FilterType>;
  selected: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const FilterButton: FunctionComponent<IProps> = ({ item, filter, selected, onClick }) => {
  const background = filter.getBackgroundColor(item);
  const textColor = background === "#ccd4db" ? "#6e7a8a" : "white";
  return (
    <StyledButton onClick={onClick} selected={selected} background={background} color={textColor}>
      <ButtonContent>{filter.getValueName(item)}</ButtonContent>
    </StyledButton>
  );
};
