import { TextField } from "@material-ui/core";
import { accountContext } from "contexts/AccountContext";
import React, { FormEvent, FunctionComponent, useCallback, useContext, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const AccountCard: FunctionComponent = () => {
  const { username, updateUsername } = useContext(accountContext);

  const currentName = username?.name ?? "";
  const currentDiscriminator = username?.discriminator.toString() ?? "";

  const [name, setName] = useState<string>(currentName);
  const [discriminator, setDiscriminator] = useState<string>(currentDiscriminator);
  const [nameError, setNameError] = useState<string>("");
  const [discriminatorError, setDiscriminatorError] = useState<string>("");

  const handleNameChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNameError("");
    setName(event.currentTarget.value);
  };

  const handleDiscriminatorChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDiscriminatorError("");
    setDiscriminator(event.currentTarget.value);
  };

  const handleClick = useCallback(async () => {
    const isNameEmpty = name.length === 0;
    const isDiscriminatorEmpty = discriminator.length === 0;

    if (isNameEmpty) {
      setNameError("Name cannot be empty");
    }

    if (isDiscriminatorEmpty) {
      setDiscriminatorError("Discriminator cannot be empty");
    }

    if (isNameEmpty || isDiscriminatorEmpty) {
      return;
    }

    try {
      await updateUsername({ name, discriminator: parseInt(discriminator, 10) });
    } catch (err) {
      console.log(err);
      if (err.statusCode === 409) {
        setDiscriminator(currentDiscriminator);
        setDiscriminatorError("Name and discriminator combination already in use");
      }
    }
  }, [currentDiscriminator, discriminator, name, updateUsername]);

  return (
    <Card>
      <CardContent>
        <span>{`${currentName}#${currentDiscriminator}`}</span>
        <TextField
          id="filled-basic-name"
          label="Name"
          variant="filled"
          onChange={handleNameChange}
          error={nameError.length > 0}
          helperText={nameError}
          value={name}
        />
        <TextField
          id="filled-basic-discriminator"
          label="Discriminator"
          variant="filled"
          onChange={handleDiscriminatorChange}
          error={discriminatorError.length > 0}
          helperText={discriminatorError}
          value={discriminator}
        />
        <button onClick={handleClick}>Submit</button>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
