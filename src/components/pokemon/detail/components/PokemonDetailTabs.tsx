import React, {
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
  useRef,
} from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import InfoTab from "./InfoTab";
import throttle from "lodash-es/throttle";

const PokemonDetailTabsContainer = styled.div`
  background-color: transparent;
  overflow: hidden;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledAppBar = styled(AppBar)`
  box-shadow: none;
  background-color: #fafafa;
  border-bottom: 1px solid rgb(225, 231, 236);
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
      height: 100%;
      padding-top: 15px;
    }
  }
`;

const TabContentContainer = styled.div`
  height: 100%;
  padding: 0;
`;

const tabs = [
  {
    name: "Info",
    iconName: "info",
    content: (id: number) => <InfoTab id={id} />,
  },
  {
    name: "Moves",
    iconName: "movedex",
    content: (id: number) => <div>moves {id}</div>,
  },
  {
    name: "Matchups",
    iconName: "matchups",
    content: (id: number) => <div>matchups {id}</div>,
  },
];

interface IProps {
  id: number;
  onScroll: (direction: "up" | "down") => void;
}

const PokemonDetailTabs: FunctionComponent<IProps> = (props) => {
  const theme = useTheme();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const { id, onScroll } = props;
  const currentTabRef = useRef<HTMLDivElement>();
  const prevScrollPositionRef = useRef<number>(0);

  useEffect(() => {
    setCurrentTabIndex(0);
  }, [id]);

  const handleChange = useCallback((event, newIndex) => {
    setCurrentTabIndex(newIndex);
  }, []);

  const handleChangeIndex = useCallback((index) => {
    setCurrentTabIndex(index);
  }, []);

  const handleScroll = useCallback(
    throttle((event: SyntheticEvent) => {
      const containerScrollY = event.currentTarget?.getBoundingClientRect().top;
      const currentTabScrollY =
        currentTabRef.current?.getBoundingClientRect().top ?? containerScrollY;
      const offsetTop = containerScrollY - currentTabScrollY;
      const prevScrollPos = prevScrollPositionRef.current;
      console.log("parent scroll Y: " + containerScrollY);
      console.log("tab scroll Y: " + currentTabScrollY);
      console.log("offsetTop: " + offsetTop);
      console.log("prevScrollPos: " + prevScrollPos);

      if (offsetTop > prevScrollPos) {
        console.log("scrolling down");
        onScroll("down");
      } else {
        console.log("scrolling up");
        onScroll("up");
      }
      prevScrollPositionRef.current = offsetTop <= 0 ? 0 : offsetTop;
    }, 100),
    [onScroll]
  );

  const handleScrollPersist = useCallback(
    (event: SyntheticEvent) => {
      event.persist();
      handleScroll(event);
    },
    [handleScroll]
  );

  const onCurrentTabRef = useCallback(
    (elem: HTMLDivElement | null, index: number) => {
      if (elem && currentTabIndex === index) {
        currentTabRef.current = elem;
      }
    },
    [currentTabIndex]
  );

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
          onScroll={handleScrollPersist}
        >
          {tabs.map((tab, index) => (
            <div
              className="container"
              key={`${tab.name}-content`}
              ref={(element) => onCurrentTabRef(element, index)}
            >
              <TabContentContainer>{tab.content(id)}</TabContentContainer>
            </div>
          ))}
        </StyledSwipeableViews>
      </StyledTabContent>
    </PokemonDetailTabsContainer>
  );
};

export default PokemonDetailTabs;
