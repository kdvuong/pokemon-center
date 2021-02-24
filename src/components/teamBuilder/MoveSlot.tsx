import TypeIcon from "components/common/components/TypeIcon";
import React, {
  FormEvent,
  FocusEvent,
  FunctionComponent,
  useCallback,
  useRef,
  Fragment,
  useEffect,
} from "react";
import { Move } from "shared/interfaces";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";

const MoveSlotWrapper = styled.div<{ slotNumber: number; active: boolean }>`
  padding: 0.5rem;
  margin-top: 1rem;
  ${(props) =>
    props.slotNumber % 2 === 0
      ? "margin-right: 1rem; margin-left: 0.5rem;"
      : "margin-left: 1rem; margin-right: 0.5rem;"}
  border-radius: 50px;
  background: white;
  box-shadow: 0 0px 1.9px rgba(0, 0, 0, 0.012), 0 0px 4.6px rgba(0, 0, 0, 0.01),
    0 0px 8.6px rgba(0, 0, 0, 0.009), 0 0px 15.4px rgba(0, 0, 0, 0.012),
    0 0px 28.8px rgba(0, 0, 0, 0.026), 0 0px 69px rgba(0, 0, 0, 0.08);
  transition: all 100ms linear;
  font-family: "Nunito Sans";
  text-transform: capitalize;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: black;
    input {
      color: white;
      cursor: pointer;
    }
  }

  ${(props) => props.active && "background: black; input { color: white; }"}

  input {
    border: none;
    margin-left: 0.5rem;
    background: transparent;
    text-transform: capitalize;
    width: 100px;
    flex: 1;
  }

  svg {
    font-size: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.25rem;
    color: grey;

    &:hover {
      color: white;
    }
  }
`;

interface IProps {
  slotNumber: number;
  onClick: (index: number) => void;
  onChange: (value: string, index: number) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onClear: (index: number) => void;
  value: string;
  active: boolean;
  move: Move | null;
}

const MoveSlot: FunctionComponent<IProps> = ({
  slotNumber,
  active,
  onClick,
  onChange,
  onBlur,
  onClear,
  value,
  move,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    active && inputRef.current?.focus();
  }, [active]);

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value, slotNumber);
    },
    [onChange, slotNumber]
  );

  const handleClick = useCallback(() => {
    onClick(slotNumber);
    inputRef.current?.focus();
  }, [onClick, slotNumber]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlur(event);
      // (event.relatedTarget as HTMLElement)?.click();
    },
    [onBlur]
  );

  const handleClear = useCallback(() => {
    onClear(slotNumber);
  }, [onClear, slotNumber]);

  return (
    <MoveSlotWrapper
      slotNumber={slotNumber + 1}
      active={active}
      onFocus={handleClick}
      onBlur={handleBlur}
      tabIndex={1}
    >
      <input
        value={value.replace("-", " ")}
        placeholder={move?.name ?? `Move ${slotNumber + 1}`}
        ref={inputRef}
        onChange={handleChange}
        spellCheck={false}
      />
      {move && (
        <Fragment>
          <TypeIcon type={move.type} size={12} />
          <ClearIcon onClick={handleClear} />
        </Fragment>
      )}
    </MoveSlotWrapper>
  );
};

export default MoveSlot;
