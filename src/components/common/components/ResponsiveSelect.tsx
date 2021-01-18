import React, { useState, useRef, useCallback, FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useMediaQuery } from "react-responsive";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Popover from "@material-ui/core/Popover";
import Drawer from "./TemporaryDrawer";
import { FilterProps, FilterHasShortendName } from "types";
import { FilterButton } from "./FilterButton";

const StyledButton = styled(ButtonBase)`
  border-radius: 10px;
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

const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const DrawerHeader = styled.h2`
  font-size: 16px;
  padding: 16px;
  justify-content: center;
  display: flex;
  color: #6e7a8a;
  font-family: "Nunito Sans";
  margin: 0;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  padding-bottom: 12px;
  overflow-y: scroll;
`;

function instanceOfFilterHasShortendName(object: any): object is FilterHasShortendName<any> {
  return "getShortenedValueName" in object;
}

const ResponsiveSelect: FunctionComponent<FilterProps> = ({ filter, currentItem, onChange }) => {
  const [showItems, setShowItems] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 659px)" });

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setShowItems(!showItems);
    },
    [showItems]
  );

  const handleClose = useCallback(() => {
    setShowItems(false);
  }, []);

  const handleItemChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const newItem = event.currentTarget.textContent ?? "";
      onChange(newItem);
      handleClose();
    },
    [handleClose, onChange]
  );

  const getCurrentItemName = useCallback(() => {
    let name = filter.getValueName(currentItem);
    if (isSmallScreen && instanceOfFilterHasShortendName(filter)) {
      name = filter.getShortenedValueName(currentItem);
    }
    return name;
  }, [currentItem, filter, isSmallScreen]);

  const openPopover = showItems && !isSmallScreen;
  const openDrawer = showItems && isSmallScreen;

  return (
    <div>
      <StyledButton onClick={handleClick} ref={anchorEl}>
        <ButtonContent>
          <span>{getCurrentItemName()}</span>
          <Arrow active={showItems} />
        </ButtonContent>
      </StyledButton>
      <Popover
        id={openPopover ? "simple-popover" : undefined}
        open={openPopover}
        anchorEl={anchorEl ? anchorEl.current : null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopoverContainer>
          {filter.getValues().map((value) => {
            const item = filter.getTypeFromValue(value) ?? null;
            return (
              <FilterButton
                item={item}
                filter={filter}
                onClick={handleItemChange}
                selected={item === currentItem}
                key={item}
              />
            );
          })}
        </PopoverContainer>
      </Popover>
      <Drawer side="bottom" open={openDrawer} onClose={handleClose}>
        <DrawerHeader>Select a {filter.getName().toLowerCase()}</DrawerHeader>
        <ItemsContainer>
          {filter.getValues().map((value) => {
            const item = filter.getTypeFromValue(value) ?? null;
            return (
              <FilterButton
                item={item}
                filter={filter}
                onClick={handleItemChange}
                selected={item === currentItem}
                key={item}
              />
            );
          })}
        </ItemsContainer>
      </Drawer>
    </div>
  );
};

export default ResponsiveSelect;
