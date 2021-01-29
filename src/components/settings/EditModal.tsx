import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import MuiModal from "@material-ui/core/Modal";
import React, { Fragment, FunctionComponent, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Zoom from "@material-ui/core/Zoom";
import Backdrop from "@material-ui/core/Backdrop";

const Modal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  display: flex;
  background-color: white;
  width: 350px;
  min-height: 200px;
  margin: 1rem;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
  width: 100%;
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
  width: 100%;
`;

const SuccessIcon = styled(CheckCircleIcon)`
  font-size: 2rem !important;
  color: #74d99f;
`;

const FadeContent = styled.div`
  width: 100%;
`;

const FadeLoading = styled.div`
  position: absolute;
`;

interface IProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  renderBody: () => ReactElement;
  actionOption?: {
    onClick: () => Promise<void>;
    text: string;
  };
}

enum Query {
  IDLE,
  PROGRESS,
  SUCCESS,
}

const EditModal: FunctionComponent<IProps> = ({
  title,
  open,
  onClose,
  onSuccess,
  renderBody,
  actionOption,
}) => {
  const [query, setQuery] = useState<Query>(Query.IDLE);

  const handleClose = useCallback(() => {
    if (query === Query.IDLE) {
      onClose();
    }
  }, [onClose, query]);

  const handleClick = useCallback(async () => {
    if (actionOption) {
      setQuery(Query.PROGRESS);
      try {
        await actionOption.onClick();
        setQuery(Query.SUCCESS);
        setTimeout(() => {
          onSuccess();
        }, 500);
      } catch (err) {
        setQuery(Query.IDLE);
      }
    }
  }, [actionOption, onSuccess]);

  const handleExit = () => {
    setQuery(Query.IDLE);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Zoom in={open} onExited={handleExit}>
        <ModalBody>
          {query === Query.SUCCESS ? (
            <Zoom in={true} unmountOnExit>
              <SuccessIcon />
            </Zoom>
          ) : (
            <Fragment>
              <Fade in={query === Query.IDLE}>
                <FadeContent>
                  <Content>
                    <Title>{title}</Title>
                    {renderBody()}
                  </Content>
                  <Footer>
                    <button onClick={handleClose}>Cancel</button>
                    {actionOption && <button onClick={handleClick}>{actionOption.text}</button>}
                  </Footer>
                </FadeContent>
              </Fade>
              <Fade in={query === Query.PROGRESS} unmountOnExit>
                <FadeLoading>
                  <CircularProgress />
                </FadeLoading>
              </Fade>
            </Fragment>
          )}
        </ModalBody>
      </Zoom>
    </Modal>
  );
};

export default EditModal;
