import { createContext } from "react";

export interface DrawerContext {
  isToolbarVisible: boolean;
  title: string;
  showToolbar: () => void;
  hideToolbar: () => void;
  setDrawerTitle: (name: string) => void;
}

const DRAWER_DEFAULT_VALUE: DrawerContext = {
  isToolbarVisible: false,
  title: "",
  showToolbar: () => {},
  hideToolbar: () => {},
  setDrawerTitle: (name: string) => {},
};

export const drawerContext = createContext<DrawerContext>(DRAWER_DEFAULT_VALUE);
