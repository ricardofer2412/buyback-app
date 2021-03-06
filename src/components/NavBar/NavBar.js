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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import firebase from "../firebase/Firebase";
import Button from "@material-ui/core/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
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
    "&:hover": {
      background: "whitenpm",
    },
  },
  hide: {
    display: "none",
    "&:hover": {
      background: "white",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#2196f3",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2196f3",
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

class PersistentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: null,
      userName: "",
      userId: "",
      currentUserId: "",
    };
  }

  componentDidUpdate = () => {
    this.getCurrentUser();
  };

  getUserName(userId) {
    let userName;
    const ref = firebase
      .firestore()
      .collection("Users")
      .doc(userId);
    ref.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const currentUserName = doc.data().userName;
      }
    });

    console.log("Current User: ", this.state.userName);
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
    console.log(this.state.user);
  }

  getCurrentUser = () => {
    if (this.props.user) {
      console.log("userId: ", this.props.user.uid);
      this.getUserName(this.props.user.uid);
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  onLogOut() {
    firebase.auth().signOut();
    console.log("user logged out!");
  }

  render() {
    const user = this.props;

    const { classes, theme } = this.props;
    const { open } = this.state;
    console.log(this.userName);
    return (
      <div className="root">
        <CssBaseline />

        <AppBar
          style={{ backgroundColor: "white" }}
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              className="nav-menu-icon"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <div className="navTitle">
              <div className="nav-title-div">
                <h3 className="nav-title">MobileSource</h3>
              </div>

              {!this.props.user ? (
                <div></div>
              ) : (
                <div className="logout-button">
                  <ExitToAppIcon
                    onClick={this.onLogOut}
                    className="logout"
                    cursor="pointer"
                  />
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={this.handleDrawerClose}
          onClickAway={this.handleDrawerClose}
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
                <Home className="icons" />
                <ListItemText primary="Home" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/vendors">
              <ListItemIcon className="menu-row">
                <People className="icons" />
                <ListItemText primary="Vendors" className="ListItemText" />
              </ListItemIcon>
            </ListItem>

            <ListItem button component={Link} to="/purchaseorders">
              <ListItemIcon className="menu-row">
                <ShoppingCart className="icons" />
                <ListItemText
                  primary="Purchase Orders"
                  className="ListItemText"
                />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/tracking">
              <ListItemIcon className="menu-row">
                <StayCurrentPortrait className="icons" />
                <ListItemText primary="Tracking" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/tools">
              <ListItemIcon className="menu-row">
                <BuildIcon className="icons" />
                <ListItemText primary="Tools" className="ListItemText" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/BuybackiPhones">
              <ListItemIcon className="menu-row">
                <MonetizationOnIcon className="icons" />
                <ListItemText
                  primary="BuyBack Prices"
                  className="ListItemText"
                />
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
