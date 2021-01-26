import { AccountContext } from "contexts/AccountContext";
import { useEffect, useState } from "react";
import { accountService } from "services/AccountService";
import { Username } from "shared/interfaces";

export const useAccount = (isAuthenticated: boolean): AccountContext => {
  const [username, setUsername] = useState<Username | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("called");
      accountService.getAccountInfo().then((accountInfo) => {
        setUsername(accountInfo.username);
        setEmail(accountInfo.email);
      });
    } else {
      setUsername(null);
      setEmail(null);
    }
  }, [isAuthenticated]);

  const updateUsername = async (newUsername: Username) => {
    if (
      newUsername.name === username?.name &&
      newUsername.discriminator === username?.discriminator
    ) {
      return;
    }
    await accountService.updateUsername(newUsername);
    setUsername(newUsername);
  };

  return {
    username,
    email,
    updateUsername,
  };
};
