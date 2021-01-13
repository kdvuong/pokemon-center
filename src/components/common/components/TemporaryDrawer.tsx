import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
  root: {
    borderRadius: "20px 20px 0 0",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    maxHeight: 400,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "20px 20px 0 0",
  },
});

type DrawerSide = "top" | "left" | "bottom" | "right";

interface IProps {
  side: DrawerSide;
  open: boolean;
  onClose: () => void;
}

const TemporaryDrawer: FunctionComponent<IProps> = ({ side, open, children, onClose }) => {
  const classes = useStyles();

  const sideList = () => (
    <div className={classes.list} role="presentation">
      {children}
    </div>
  );

  const fullList = () => (
    <div className={classes.fullList} role="presentation">
      {children}
    </div>
  );

  const displayList = () => {
    if (side === "top" || side === "bottom") {
      return fullList();
    } else {
      return sideList();
    }
  };

  return (
    <Drawer
      anchor={side}
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
    >
      {displayList()}
    </Drawer>
  );
};

export default TemporaryDrawer;
