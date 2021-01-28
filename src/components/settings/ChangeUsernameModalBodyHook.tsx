import { accountContext } from "contexts/AccountContext";
import React, {
  FormEvent,
  Fragment,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

const Label = styled.label`
  width: max-content;
`;

const HiddenLabel = styled.label`
  visibility: hidden;
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0.25rem;
  flex: 1;
  input {
    border: none;
  }
  input:nth-child(1) {
    flex: 1;
  }
  input:nth-child(3) {
    max-width: 80px;
    &::before {
      position: relative;
      content: "#";
    }
  }
  &:focus-within {
    border: 1px solid rgba(0, 0, 0, 1);
  }
`;

const Separator = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex: 1;
  margin: 0 0.25rem;
  max-width: 0;
`;

interface IChangeUsernameModalHook {
  renderBody: () => ReactElement;
  onSubmit: () => Promise<void>;
  reset: () => void;
}

const useChangeUsernameModalHook = (): IChangeUsernameModalHook => {
  const { username, updateUsername } = useContext(accountContext);

  const currentName = username?.name ?? "";
  const currentDiscriminator = username?.discriminator.toString() ?? "";

  const [name, setName] = useState<string>(currentName);
  const [discriminator, setDiscriminator] = useState<string>(currentDiscriminator);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setName(currentName);
    setDiscriminator(currentDiscriminator);
  }, [currentDiscriminator, currentName]);

  const handleNameChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError("");
    setName(event.currentTarget.value);
  };

  const handleDiscriminatorChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError("");
    setDiscriminator(event.currentTarget.value);
  };

  const handleClick = useCallback(async () => {
    const isNameEmpty = name.length === 0;
    const isDiscriminatorEmpty = discriminator.length === 0;

    if (isNameEmpty) {
      setError("Name cannot be empty");
    }

    if (isDiscriminatorEmpty) {
      setError("Discriminator cannot be empty");
    }

    if (isNameEmpty || isDiscriminatorEmpty) {
      return;
    }

    try {
      await updateUsername({ name, discriminator: parseInt(discriminator, 10) });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }, [discriminator, name, updateUsername]);

  const renderBody = useCallback(
    () => (
      <Fragment>
        <Label htmlFor="username">Username</Label>
        <HiddenLabel htmlFor="discriminator">Discriminator</HiddenLabel>
        <InputWrapper>
          <InputContainer>
            <input name="username" id="username" value={name} onChange={handleNameChange} />
            <Separator />
            <input
              name="discriminator"
              id="discriminator"
              value={discriminator}
              onChange={handleDiscriminatorChange}
              type="number"
              min="1"
              max="9999"
            />
          </InputContainer>
          {error && <span>{error}</span>}
        </InputWrapper>
      </Fragment>
    ),
    [discriminator, error, name]
  );

  const reset = useCallback(() => {
    setName(currentName);
    setDiscriminator(currentDiscriminator);
  }, [currentDiscriminator, currentName]);

  return {
    renderBody,
    onSubmit: handleClick,
    reset,
  };
};

export default useChangeUsernameModalHook;
