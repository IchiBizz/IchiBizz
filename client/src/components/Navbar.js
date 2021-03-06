import React from "react";
import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Logout from "./Logout";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarsIcon from "@material-ui/icons/Stars";
import MoodIcon from "@material-ui/icons/Mood";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { blue, red } from "@material-ui/core/colors";
import "../App.css";
import ProductsList from "./products/ProductsList";
import { withRouter } from "react-router";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

let SwipeableTemporaryDrawer = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {/* <ListItem>
          <Link
            to="/contact"
            style={{ color: "#616161", textDecoration: "none" }}
          >
            <PermIdentityIcon />
            Profile
            <ListItemText />
          </Link>
        </ListItem> */}
        <ListItem>
          <Link
            to="/dashboard"
            style={{ color: "#616161", textDecoration: "none" }}
          >
            <DashboardIcon />
            My Dashboard
            <ListItemText />
          </Link>
        </ListItem>
        {/* <ListItem>
          <Link to="#" style={{ color: "#616161", textDecoration: "none" }}>
            <StarsIcon />
            Wishlist
            <ListItemText />
          </Link>
        </ListItem> */}

        <ListItem>
          <Link
            to="/products"
            style={{ color: "#616161", textDecoration: "none" }}
          >
            <MoodIcon />
            Find Products
            <ListItemText />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Logout />
          <ListItemText />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="naVbar">
      <MenuRoundedIcon
        className="naVbarButton"
        fontSize="large"
        color="primary"
        onClick={toggleDrawer("right", true)}
      />

      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        {...props}
      >
        {sideList("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default withRouter(SwipeableTemporaryDrawer);
