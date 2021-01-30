import { AccountContext } from "contexts/AccountContext";
import { useCallback, useEffect, useState } from "react";
import { accountService } from "services/AccountService";
import { Username } from "shared/interfaces";

export const useAccount = (isAuthenticated: boolean): AccountContext => {
  const [username, setUsername] = useState<Username | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      accountService
        .getAccountInfo()
        .then((accountInfo) => {
          setUsername(accountInfo.username);
          setEmail(accountInfo.email);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUsername(null);
      setEmail(null);
    }
  }, [isAuthenticated]);

  const updateUsername = async (newUsername: Username) => {
    if (newUsername.name === username?.name && newUsername.tag === username?.tag) {
      return;
    }
    await accountService.updateUsername(newUsername);
    setUsername(newUsername);
  };

  const getFormattedUsername = useCallback(() => {
    return {
      name: username?.name ?? "",
      tag: username?.tag.toString().padStart(4, "0") ?? "",
    };
  }, [username]);

  return {
    username,
    email,
    updateUsername,
    getFormattedUsername,
  };
};
