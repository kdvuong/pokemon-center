import { useState, useCallback } from "react";
import { DrawerContext } from "../contexts/Drawer.context";

export const useDrawer = (): DrawerContext => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
  }, []);

  const hideToolbar = useCallback(() => {
    setIsToolbarVisible(false);
  }, []);

  const setDrawerTitle = useCallback((name: string) => {
    setTitle(name);
  }, []);

  return {
    isToolbarVisible,
    title,
    showToolbar,
    hideToolbar,
    setDrawerTitle,
  };
};
