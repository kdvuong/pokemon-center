import Modal from "@material-ui/core/Modal";
import React, { Fragment, FunctionComponent, ReactElement, useState } from "react";
import styled from "styled-components";

const ModalBody = styled.div`
  display: flex;
  background-color: white;
  width: 350px;
  margin: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  border-radius: 5px;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Nunito Sans";
`;

const Footer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  background-color: rgb(242, 243, 245);
  border-radius: 0 0 5px 5px;
`;

interface IProps {
  title: string;
  open: boolean;
  onClose: () => void;
  renderBody: () => ReactElement;
  actionOption?: {
    onClick: () => Promise<void>;
    text: string;
  };
}

const EditModal: FunctionComponent<IProps> = ({
  title,
  open,
  onClose,
  renderBody,
  actionOption,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (actionOption) {
      setIsLoading(true);
      await actionOption.onClick();
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody>
        {isLoading ? (
          <div>is loading</div>
        ) : (
          <Fragment>
            <Content>
              <Title>{title}</Title>
              {renderBody()}
            </Content>
            <Footer>
              <button onClick={onClose}>Cancel</button>
              {actionOption && <button onClick={handleClick}>{actionOption.text}</button>}
            </Footer>
          </Fragment>
        )}
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
