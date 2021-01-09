import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import { IRoute } from "../../router/config";
import { DEX_LIST, TEAMBUILDER_LINK } from "../../router/links";
import Router from "../../router/Router";
import { Link } from "react-router-dom";
import { drawerContext } from "../../contexts/Drawer.context";
import styled from "styled-components";

const drawerWidth = 240;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      background: "#dd2020",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBarTitle: {
      fontFamily: "Nunito Sans",
    },
  })
);

interface IProps {
  routes: IRoute[];
}

export default function ResponsiveDrawer(props: IProps) {
  const { routes } = props;
  const { isToolbarVisible, currentLink } = useContext(drawerContext);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {DEX_LIST.map((dex, index) => (
          <ListItem
            button
            key={dex.name}
            component={Link}
            to={dex.path}
            selected={dex === currentLink}
          >
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={dex.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={TEAMBUILDER_LINK.name}
          component={Link}
          to={TEAMBUILDER_LINK.path}
          selected={TEAMBUILDER_LINK === currentLink}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={TEAMBUILDER_LINK.name} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isToolbarVisible && (
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.appBarTitle} variant="h6" noWrap>
              {currentLink?.name}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Main>
        {isToolbarVisible && <div className={classes.toolbar} />}
        <Router routes={routes} />
      </Main>
    </div>
  );
}
