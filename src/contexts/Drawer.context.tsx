import { createContext } from "react";

export interface DrawerContext {
  isToolbarVisible: boolean;
  showToolbar: () => void;
  hideToolbar: () => void;
}

const DRAWER_DEFAULT_VALUE: DrawerContext = {
  isToolbarVisible: false,
  showToolbar: () => {},
  hideToolbar: () => {},
};

export const drawerContext = createContext<DrawerContext>(DRAWER_DEFAULT_VALUE);
