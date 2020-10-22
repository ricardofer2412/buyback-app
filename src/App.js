import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import VendorCount from "./components/Dashboard/VendorCount";
import PoCount from "./components/Dashboard/PoCount";
import TrackingCount from "./components/Dashboard/TrackingCount";
import CustomerListDash from "./components/Dashboard/CustomerListDash";
import "./app.css";
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  fixedHeight: {
    height: 125,
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "100%",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    textAlign: "center",
    justify: "center",
  },
  AccountCircleIcon: {
    color: "red",
    justify: "center",
    fontSize: 30,
  },

  title: {
    margin: 5,
    color: "#708096",
    fontSize: 35,
  },
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>
        <div className="cards">
          <Grid container spacing={4}>
            <Grid item sm>
              <Paper>
                <VendorCount />
              </Paper>
            </Grid>
            <Grid item sm>
              <Paper>
                <PoCount />
              </Paper>
            </Grid>
            <Grid item sm>
              <Paper>
                <TrackingCount />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Box pt={4}></Box>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
