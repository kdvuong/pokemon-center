import { accountContext } from "contexts/AccountContext";
import React, { useContext } from "react";
import useChangeUsernameModalHook from "./ChangeUsernameModalBodyHook";
import EditableField from "./EditableField";

const UserField = () => {
  const { username } = useContext(accountContext);
  const { renderBody, onSubmit, reset } = useChangeUsernameModalHook();
  const currentName = username?.name ?? "";
  const currentDiscriminator = username?.discriminator.toString() ?? "";
  return (
    <EditableField
      name="Username"
      value={`${currentName}#${currentDiscriminator}`}
      modalOption={{
        title: "Change your username",
        renderBody,
        actionOption: {
          onClick: onSubmit,
          text: "Done",
        },
        onClose: reset,
      }}
    />
  );
};

export default UserField;
