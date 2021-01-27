import ButtonBase from "@material-ui/core/ButtonBase";
import React, { FunctionComponent, ReactElement, useState } from "react";
import styled from "styled-components";
import EditModal from "./EditModal";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  span:nth-child(1) {
    // header
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.5);
  }
  span:nth-child(2) {
    // value
    padding-top: 0.25rem;
  }
`;

const EditButton = styled(ButtonBase)``;

interface IProps {
  name: string;
  value: string;
  onEdit: () => void;
  modalBody: ReactElement;
}

const EditableField: FunctionComponent<IProps> = ({ name, value, onEdit, modalBody }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <TextWrapper>
        <span>{name}</span>
        <span>{value}</span>
      </TextWrapper>
      <EditButton onClick={handleOpen}>Edit</EditButton>
      <EditModal open={isOpen} onClose={handleClose} body={modalBody} />
    </Container>
  );
};

export default EditableField;
