import React, {
  useState,
  useRef,
  useCallback,
  FunctionComponent,
  MouseEvent,
} from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useMediaQuery } from "react-responsive";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Popover from "@material-ui/core/Popover";
import Drawer from "./TemporaryDrawer";

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

const Arrow = styled(ArrowDropDown)<{ active: boolean }>`
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0)")};
  transition: all 200ms ease-in-out;
`;

const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

interface IProps {
  name: string;
  currentItem: string;
  items: string[];
  onChange: (value: string) => void;
}

const ResponsiveSelect: FunctionComponent<IProps> = ({
  items,
  currentItem,
  onChange,
}) => {
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

  const openPopover = showItems && !isSmallScreen;
  const openDrawer = showItems && isSmallScreen;

  return (
    <div>
      <StyledButton onClick={handleClick} ref={anchorEl}>
        <ButtonContent>
          <span>{currentItem}</span>
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
          {items.map((item) => {
            return <button onClick={handleItemChange}>{item}</button>;
          })}
        </PopoverContainer>
      </Popover>
      <Drawer side="bottom" open={openDrawer} onClose={handleClose}>
        {items.map((item) => {
          return <button onClick={handleItemChange}>{item}</button>;
        })}
      </Drawer>
    </div>
  );
};

export default ResponsiveSelect;
