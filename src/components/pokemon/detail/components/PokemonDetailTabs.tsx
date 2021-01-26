import React, { useState, useCallback, useEffect, FunctionComponent } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import InfoTab from "./info/InfoTab";
import MoveTab from "./moves/MoveTab";
import { Pokemon } from "shared/interfaces";
import usePokemonApi from "hooks/PokemonApiHook";
import MatchupTab from "./matchup/MatchupTab";

const PokemonDetailTabsContainer = styled.div`
  background-color: transparent;
  overflow: hidden;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledAppBar = styled(AppBar)`
  box-shadow: none !important;
  background-color: #fafafa !important;
  border-bottom: 1px solid rgb(225, 231, 236) !important;
`;

const StyledTabs = styled(Tabs)`
  button {
    color: grey;
    font-size: 12px;
  }

  .Mui-selected {
    color: #dd2020;
  }

  .MuiTabs-indicator {
    display: flex;
    justify-content: center;
    background-color: transparent;
    & > div {
      max-width: 100px;
      width: 100%;
      background-color: #dd2020;
    }
  }
`;

const TabIcon = styled.i`
  font-size: 20px;
`;

const StyledTabContent = styled.div`
  padding: 0;
  flex: 1;
  overflow: hidden;
  height: 100%;
`;

const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  overflow: hidden;

  .react-swipeable-view-container {
    height: 100%;
    .container {
      padding-top: 15px;
    }
  }
`;

const TabContentContainer = styled.div`
  height: 100%;
`;

const tabs = [
  {
    name: "Info",
    iconName: "info",
    content: (pokemon: Pokemon) => <InfoTab pokemon={pokemon} />,
  },
  {
    name: "Moves",
    iconName: "movedex",
    content: (pokemon: Pokemon) => <MoveTab movesetId={pokemon.moveset_id} />,
  },
  {
    name: "Matchups",
    iconName: "matchups",
    content: (pokemon: Pokemon) => <MatchupTab types={pokemon.types} />,
  },
];

interface IProps {
  id: number;
}

const PokemonDetailTabs: FunctionComponent<IProps> = ({ id }) => {
  const theme = useTheme();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { getPokemonById } = usePokemonApi();

  useEffect(() => {
    let isSubscribed = true;
    getPokemonById(id).then((pokemon) => {
      isSubscribed && setPokemon(pokemon);
    });

    return () => {
      isSubscribed = false;
    };
  }, [getPokemonById, id]);

  useEffect(() => {
    setCurrentTabIndex(0);
  }, [id]);

  const handleChange = useCallback((event, newIndex) => {
    setCurrentTabIndex(newIndex);
  }, []);

  const handleChangeIndex = useCallback((index) => {
    setCurrentTabIndex(index);
  }, []);

  return (
    <PokemonDetailTabsContainer>
      <StyledAppBar position="relative" color="default">
        <div className="container">
          <StyledTabs
            value={currentTabIndex}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{ children: <div /> }}
          >
            {tabs.map((tab) => (
              <Tab
                icon={<TabIcon className={`icon-${tab.iconName}`} />}
                disableRipple
                key={tab.name}
              />
            ))}
          </StyledTabs>
        </div>
      </StyledAppBar>

      <StyledTabContent>
        <StyledSwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={currentTabIndex}
          onChangeIndex={handleChangeIndex}
          enableMouseEvents
        >
          {tabs.map((tab) => (
            <TabContentContainer key={`${tab.name}-content`}>
              {pokemon ? tab.content(pokemon) : <div>Loading...</div>}
            </TabContentContainer>
          ))}
        </StyledSwipeableViews>
      </StyledTabContent>
    </PokemonDetailTabsContainer>
  );
};

export default PokemonDetailTabs;
