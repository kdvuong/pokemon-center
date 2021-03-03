import { useAccount } from "hooks/AccountHook";
import React from "react";
import useChangeUsernameModalHook from "./ChangeUsernameModalBodyHook";
import EditableField from "./EditableField";

const UserField = () => {
  const { getFormattedUsername } = useAccount();
  const { renderBody, onSubmit, reset } = useChangeUsernameModalHook();
  const { name, tag } = getFormattedUsername();
  return (
    <EditableField
      name="Username"
      value={`${name}#${tag}`}
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
