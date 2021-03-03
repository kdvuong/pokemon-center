import React, {
  useState,
  useRef,
  useCallback,
  FunctionComponent,
  MouseEvent,
  useMemo,
} from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Popover from "@material-ui/core/Popover";
import Drawer from "./TemporaryDrawer";
import { FilterProps, FilterHasShortendName } from "shared/interfaces";
import { FilterButton } from "./FilterButton";

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

const AnchorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Label = styled.span`
  text-align: center;
  color: #6e7a8a;
`;

function instanceOfFilterHasShortendName(object: any): object is FilterHasShortendName<any> {
  return "getShortenedValueName" in object;
}

export interface AnchorProps {
  active: boolean;
  onClick: () => void;
  onRef: (el: HTMLButtonElement) => void;
  currentName: string;
}

interface IProps extends FilterProps {
  renderAnchor: (props: AnchorProps) => JSX.Element;
  label?: string;
}

const ResponsiveSelect: FunctionComponent<IProps> = ({
  filter,
  currentItem,
  onChange,
  renderAnchor,
  label,
}) => {
  const [showItems, setShowItems] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 659px)" });

  const handleAnchorRef = (el: HTMLButtonElement) => {
    anchorEl.current = el;
  };

  const handleClick = useCallback(() => {
    setShowItems(!showItems);
  }, [showItems]);

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

  const Anchor = useMemo(
    () =>
      renderAnchor({
        active: showItems,
        onClick: handleClick,
        onRef: handleAnchorRef,
        currentName: getCurrentItemName(),
      }),
    [getCurrentItemName, handleClick, renderAnchor, showItems]
  );

  return (
    <div>
      <AnchorContainer>
        {Anchor}
        {label && <Label>{label}</Label>}
      </AnchorContainer>
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
