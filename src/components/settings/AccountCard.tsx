import React, { FunctionComponent, useContext } from "react";
import { accountContext } from "contexts/AccountContext";
import styled from "styled-components";
import EditableField from "./EditableField";

const Card = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: rgb(242, 243, 245);
`;

const Title = styled.h2`
  span:nth-child(1) {
    font-weight: bold;
    color: black;
    font-size: 1.2rem;
  }
  span:nth-child(2) {
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.1rem;
  }
`;

const AccountInfoCard = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 10px;
`;

const AccountCard: FunctionComponent = () => {
  const { username } = useContext(accountContext);

  const currentName = username?.name ?? "";
  const currentDiscriminator = username?.discriminator.toString() ?? "";

  // const [name, setName] = useState<string>(currentName);
  // const [discriminator, setDiscriminator] = useState<string>(currentDiscriminator);
  // const [nameError, setNameError] = useState<string>("");
  // const [discriminatorError, setDiscriminatorError] = useState<string>("");

  // const handleNameChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setNameError("");
  //   setName(event.currentTarget.value);
  // };

  // const handleDiscriminatorChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setDiscriminatorError("");
  //   setDiscriminator(event.currentTarget.value);
  // };

  // const handleClick = useCallback(async () => {
  //   const isNameEmpty = name.length === 0;
  //   const isDiscriminatorEmpty = discriminator.length === 0;

  //   if (isNameEmpty) {
  //     setNameError("Name cannot be empty");
  //   }

  //   if (isDiscriminatorEmpty) {
  //     setDiscriminatorError("Discriminator cannot be empty");
  //   }

  //   if (isNameEmpty || isDiscriminatorEmpty) {
  //     return;
  //   }

  //   try {
  //     await updateUsername({ name, discriminator: parseInt(discriminator, 10) });
  //   } catch (err) {
  //     console.log(err);
  //     if (err.statusCode === 409) {
  //       setDiscriminator(currentDiscriminator);
  //       setDiscriminatorError("Name and discriminator combination already in use");
  //     }
  //   }
  // }, [currentDiscriminator, discriminator, name, updateUsername]);

  return (
    <Card>
      <Title>
        <span>{currentName}</span>
        <span>{`#${currentDiscriminator}`}</span>
      </Title>
      <AccountInfoCard>
        <EditableField
          name="Username"
          value={`${currentName}#${currentDiscriminator}`}
          onEdit={() => {}}
          modalBody={<div>hello</div>}
        />
        {/* <TextField
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
        <button onClick={handleClick}>Submit</button> */}
      </AccountInfoCard>
    </Card>
  );
};

export default AccountCard;
