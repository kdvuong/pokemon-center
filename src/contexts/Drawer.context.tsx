import React, { createContext, FunctionComponent, useContext, useEffect } from "react";
import { ILink, POKEDEX_LINK } from "router/drawerNav";

export interface DrawerContext {
  isToolbarVisible: boolean;
  currentLink: ILink | null;
  showToolbar: () => void;
  hideToolbar: () => void;
  setCurrentLink: (link: ILink | null) => void;
}

const DRAWER_DEFAULT_VALUE: DrawerContext = {
  isToolbarVisible: false,
  currentLink: POKEDEX_LINK,
  showToolbar: () => {},
  hideToolbar: () => {},
  setCurrentLink: (link: ILink | null) => {},
};

export const drawerContext = createContext<DrawerContext>(DRAWER_DEFAULT_VALUE);

interface WithDrawerContextProps {
  toolbarVisible?: boolean;
  link?: ILink;
}

export function withDrawerContext(Component: FunctionComponent, options: WithDrawerContextProps) {
  const DecoratedComponent = () => {
    const { showToolbar, hideToolbar, setCurrentLink } = useContext(drawerContext);
    const { link, toolbarVisible } = options;
    useEffect(() => {
      if (toolbarVisible) {
        showToolbar();
      } else {
        hideToolbar();
      }
      setCurrentLink(link ?? null);

      return () => {
        hideToolbar();
        setCurrentLink(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component />;
  };

  return DecoratedComponent;
}
