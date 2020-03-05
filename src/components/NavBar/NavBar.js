import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home'
import { Link } from 'react-router-dom';
import { People, ShoppingCart, StayCurrentPortrait } from '@material-ui/icons'
import './NavBar.css'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      color: '#E7EAF0'

    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    background: '#4C6178'
    
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: 'white',
      color: 'bbl'
    },
  },
 

  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',

    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#182B50',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },

  listItemText: {
    color: '#E7EAF0'
  },

  VersionText: {
    color: '#E7EAF0',
    align: 'center',
    hight: 5


  }
  
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (

      <div>
          <div className={classes.toolbarIcon}>
          <IconButton o>
          <Typography className={classes.listItemText} align='right'>
            Version 1.0
          </Typography>
          </IconButton>
        </div>
        <div className={classes.toolbar} />
 
        <List component="nav" aria-label="Main mailbox folders">
       <Divider />
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <Home className={classes.listItemText}/>
                <ListItemText  className={classes.listItemText} primary="Home" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/vendors">
              <ListItemIcon >
                <People  className={classes.listItemText} />
                <ListItemText  className={classes.listItemText} primary="Vendors" />
              </ListItemIcon>
            </ListItem>

            <ListItem button component={Link} to="/purchaseorders">
              <ListItemIcon>
                <ShoppingCart  className={classes.listItemText} />
                <ListItemText  className={classes.listItemText} primary="Purchase Orders" />
              </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/tracking">
              <ListItemIcon>
                <StayCurrentPortrait  className={classes.listItemText} />
                <ListItemText  className={classes.listItemText} primary="Tracking" />
              </ListItemIcon>
            </ListItem>
          </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              BUYBACK APP
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);