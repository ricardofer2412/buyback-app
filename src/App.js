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




const styles = theme => ({
  root: {
    display: 'flex',
  },
  fixedHeight: {
    height: 150,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class App extends React.Component {
  render() {

    const { classes } = this.props
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
          </Typography>
            <Grid container spacing={4}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={classes.fixedHeight}>
                  <VendorCount />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={classes.fixedHeight}>
                  <VendorCount />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={classes.fixedHeight}>
                  <VendorCount />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
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