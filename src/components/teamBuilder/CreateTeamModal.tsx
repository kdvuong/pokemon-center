import Modal from "components/common/components/Modal";
import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Team } from "shared/interfaces";

interface IProps {
  open: boolean;
  onClose: () => void;
  onCreateTeam: (name?: string) => Promise<Team>;
  onCreateSuccess: (team: Team) => void;
}

const CreateTeamModal: FunctionComponent<IProps> = ({
  open,
  onClose,
  onCreateTeam,
  onCreateSuccess,
}) => {
  const [name, setName] = useState<string>("");

  const handleNameChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.currentTarget.value);
  };

  const handleCreateTeam = useCallback(async () => {
    try {
      const team = await onCreateTeam(name);
      return team;
    } catch (err) {
      throw err;
    }
  }, [name, onCreateTeam]);

  const handleClose = useCallback(() => {
    setName("");
    onClose();
  }, [onClose]);

  const handleSuccess = (team: Team) => {
    onCreateSuccess(team);
    handleClose();
  };

  return (
    <Modal
      title="Create new team"
      open={open}
      onClose={onClose}
      actionOption={{ onClick: handleCreateTeam, onSuccess: handleSuccess, text: "Create" }}
    >
      <input onChange={handleNameChange} />
    </Modal>
  );
};

export default CreateTeamModal;
