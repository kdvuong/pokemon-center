import React, { useEffect, useContext } from "react";
import { drawerContext } from "contexts/Drawer.context";

const PokemonDetail = () => {
  const { hideToolbar } = useContext(drawerContext);

  useEffect(() => {
    hideToolbar();
  }, [hideToolbar]);

  return <div>Pokemon</div>;
};

export default PokemonDetail;
