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
  input:nth-child(4) {
    max-width: 80px;
  }
  &:focus-within {
    border: 1px solid rgba(0, 0, 0, 1);
  }
`;

const Separator = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex: 1;
  margin-right: 1rem;
  max-width: 0;
`;

const TagPrefix = styled.span`
  padding: 1px 0;
`;

interface IChangeUsernameModalHook {
  renderBody: () => ReactElement;
  onSubmit: () => Promise<void>;
  reset: () => void;
}

const useChangeUsernameModalHook = (): IChangeUsernameModalHook => {
  const { updateUsername, getFormattedUsername } = useContext(accountContext);

  const { name: currentName, tag: currentTag } = getFormattedUsername();

  const [name, setName] = useState<string>(currentName);
  const [tag, setTag] = useState<string>(currentTag);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setName(currentName);
    setTag(currentTag);
  }, [currentTag, currentName]);

  const handleNameChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError("");
    setName(event.currentTarget.value);
  };

  const handleTagChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError("");
    setTag(event.currentTarget.value);
  };

  const handleClick = useCallback(async () => {
    const isNameEmpty = name.length === 0;
    const isTagEmpty = tag.length === 0;

    if (isNameEmpty) {
      setError("Name cannot be empty");
    }

    if (isTagEmpty) {
      setError("Tag cannot be empty");
    }

    if (isNameEmpty || isTagEmpty) {
      throw new Error();
    }

    try {
      await updateUsername({ name, tag: parseInt(tag, 10) });
    } catch (err) {
      if (err.statusCode === 409) {
        setError("Name and tag combination already in use");
      } else {
        setError("Unexpected error occurred");
      }
      throw err;
    }
  }, [tag, name, updateUsername]);

  const renderBody = useCallback(
    () => (
      <Fragment>
        <Label htmlFor="username">Username</Label>
        <HiddenLabel htmlFor="tag">Tag</HiddenLabel>
        <InputWrapper>
          <InputContainer>
            <input name="username" id="username" value={name} onChange={handleNameChange} />
            <Separator />
            <TagPrefix>#</TagPrefix>
            <input
              name="tag"
              id="tag"
              value={tag}
              onChange={handleTagChange}
              type="number"
              min="1"
              max="9999"
            />
          </InputContainer>
          {error && <span>{error}</span>}
        </InputWrapper>
      </Fragment>
    ),
    [tag, error, name]
  );

  const reset = useCallback(() => {
    setName(currentName);
    setTag(currentTag);
    setError("");
  }, [currentTag, currentName]);

  return {
    renderBody,
    onSubmit: handleClick,
    reset,
  };
};

export default useChangeUsernameModalHook;
