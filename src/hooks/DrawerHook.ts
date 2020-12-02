import { useState, useCallback } from "react";
import { DrawerContext } from "../contexts/Drawer.context";

export const useDrawer = (): DrawerContext => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
  }, []);

  const hideToolbar = useCallback(() => {
    setIsToolbarVisible(false);
  }, []);

  return {
    isToolbarVisible,
    showToolbar,
    hideToolbar,
  };
};
