import React from "react";
import ButtonAppBar from './components/NavBar/NavBar'
import { DialogContent } from "@material-ui/core";
import NavBar from './components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import VendorCount from './components/Dashboard/VendorCount'
import PoCount from './components/Dashboard/PoCount'
import TrackingCount from './components/Dashboard/TrackingCount'
import CustomerListDash from './components/Dashboard/CustomerListDash'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  fixedHeight: {
    height: 125,
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',

  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    textAlign: 'center',
    justify: 'center'
  },
  AccountCircleIcon: {
    color: 'red',
    justify: 'center',
    fontSize: 30

  },

  title: {
    margin: 5,
    color: '#708096',
    fontSize: 35
  }

});

class App extends React.Component {
  render() {

    const { classes } = this.props
    return (

      <div className={classes.root}>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <Typography component="h1" variant="h3" color="inherit" noWrap className={classes.title}>
              Dashboard
          </Typography>
            <Grid container spacing={4} >
              <Grid item sm>
                <Paper className={classes.fixedHeight}>
                  <VendorCount />
                </Paper>
              </Grid>
              <Grid item sm>
                <Paper className={classes.fixedHeight}>
                  <PoCount />
                </Paper>
              </Grid>
              \              <Grid item sm>
                <Paper className={classes.fixedHeight}>
                  <TrackingCount />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <CustomerListDash />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
            </Box>
          </Container>
        </main>
      </div>
    )
  };
}

export default withStyles(styles)(withRouter(App));