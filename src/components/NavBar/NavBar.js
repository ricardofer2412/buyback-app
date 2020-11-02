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

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    user: null,
    userName: "",
    userId: "",
    currentUserId: "",
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  async getUserName() {
    const ref = await firebase
      .firestore()
      .collection("Users")
      .doc();
    ref.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        console.log(userData);
      }
    });
  }

  getCurrentUser = () => {
    const userId = this.state;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid;
        this.setState({
          currentUserId: this.userId,
        });
      }
    });
    console.log(this.state.currentUserId);
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
    const user = this.state;
    const { classes, theme } = this.props;
    const { open } = this.state;
    console.log("USER ID: " + this.state.currentUserId);
    if (user) {
      console.log("user logged in");
    } else {
      console.log("No user logged in");
    }
    return (
      <div className={classes.root}>
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
            <Typography className="nav-title" noWrap>
              MOBILESOURCE - DASHBOARD
            </Typography>

            {!user ? (
              <Typography>No login</Typography>
            ) : (
              <Button id="log_out_button" onClick={this.onLogOut}>
                Log Out
              </Button>
            )}
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

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
