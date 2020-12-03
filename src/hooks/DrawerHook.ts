import { useState, useCallback } from "react";
import { ILink } from "router/drawerNav";
import { DrawerContext } from "../contexts/Drawer.context";

export const useDrawer = (): DrawerContext => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<ILink | null>(null);

  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
  }, []);

  const hideToolbar = useCallback(() => {
    setIsToolbarVisible(false);
  }, []);

  return {
    isToolbarVisible,
    currentLink,
    showToolbar,
    hideToolbar,
    setCurrentLink,
  };
};
