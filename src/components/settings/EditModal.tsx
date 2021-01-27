import Modal from "@material-ui/core/Modal";
import React, { FunctionComponent, ReactElement } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  body: ReactElement;
}

const EditModal: FunctionComponent<IProps> = ({ open, onClose, body }) => {
  return (
    <Modal open={open} onClose={onClose}>
      {body}
    </Modal>
  );
};

export default EditModal;
