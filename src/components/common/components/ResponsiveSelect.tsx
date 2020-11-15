import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useMediaQuery } from "react-responsive";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

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

interface IProps {
  name: string;
  currentItem: string;
  allItems: string[];
  onChange: (value: string) => void;
}

const ResponsiveSelect: FunctionComponent<IProps> = (props) => {
  const [showItems, setShowItems] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const handleClick = useCallback(() => {
    setShowItems(!showItems);
  }, [showItems]);

  const handleBlur = useCallback(() => {
    setShowItems(false);
  }, []);

  return (
    <div>
      <StyledButton
        onClick={handleClick}
        onBlur={!isSmallScreen ? handleBlur : undefined}
      >
        <ButtonContent>
          <span>All Types</span>
          <Arrow active={showItems} />
        </ButtonContent>
      </StyledButton>
    </div>
  );
};

export default ResponsiveSelect;
