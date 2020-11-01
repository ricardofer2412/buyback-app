import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import { People, ShoppingCart, StayCurrentPortrait } from "@material-ui/icons";
import "./NavBar.css";
import BuildIcon from "@material-ui/icons/Build";
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#263238",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#3b5998",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class SideBar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={this.handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            className={classes.drawerHeader}
            onClick={this.handleDrawerClose}
          >
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon className="left-icon" />
              ) : (
                <ChevronRightIcon className="right-icon" />
              )}
            </IconButton>
          </div>
          <Divider />
          <List
            component="nav"
            aria-label="Main mailbox folders"
            onClick={this.handleDrawerClose}
          >
            <ListItem button component={Link} to="/">
              <ListItemIcon className="menu-row">
                <Home className="icon" />
                <ListItemText primary="Home" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/vendors">
              <ListItemIcon className="menu-row">
                <People className="icon" />
                <ListItemText primary="Vendors" className="ListItemText" />
              </ListItemIcon>
            </ListItem>

            <ListItem button component={Link} to="/purchaseorders">
              <ListItemIcon className="menu-row">
                <ShoppingCart className="icon" />
                <ListItemText
                  primary="Purchase Orders"
                  className="ListItemText"
                />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/tracking">
              <ListItemIcon className="menu-row">
                <StayCurrentPortrait className="icon" />
                <ListItemText primary="Tracking" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/tools">
              <ListItemIcon className="menu-row">
                <BuildIcon className="icon" />
                <ListItemText primary="Tools" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default SideBar;
