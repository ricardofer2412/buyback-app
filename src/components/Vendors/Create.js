import React, { Component } from "react";
import firebase from "../firebase/Firebase";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {
  withRouter
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import NavBar from '../NavBar/NavBar'


const referreds = [
  {
    value: 'Verizon',
    label: 'Verizon'
  },
  {
    value: 'Sprint',
    label: 'Sprint',
  }, {
    value: 'T-Mobile',
    label: 'T-Mobile',
  },
  {
    value: 'AT&T',
    label: 'AT&T',
  },

]

const uuid = require("uuid");

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menu: {
    width: 200,
  },
});

class Create extends Component {
  constructor(props) {
    super(props);




    this.ref = firebase.firestore().collection("customers");
    this.state = {
      vendorName: '',
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      company: "",
      address: "",
      referredBy: ""


    };

  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();



    const { vendorName, firstName, lastName, phoneNumber, email, company, address, referredBy } = this.state;
    const customerId = uuid();

    console.log("customerId: ", customerId);
    this.ref
      .doc(customerId)
      .set({
        vendorName,
        firstName,
        lastName,
        phoneNumber,
        email,
        purchaseOrders: [],
        customerId,
        company,
        address,
        referredBy
      })
      .then(() => {
        this.setState({
          vendorName: '',
          firstName: "",
          lastName: "",
          phoneNumber: "",
          emai: "",
          company: "",
          address: "",
          referredBy: ""
        });
        this.props.history.push('/vendors');
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { classes } = this.props;

    const { vendorName, phoneNumber, email, company, address, referredBy } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <NavBar />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Vendor
        </Typography>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Vendor Name"
                  InputProps={{ name: 'vendorName' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={vendorName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Company"
                  InputProps={{ name: 'company' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={company}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  InputProps={{ name: 'email' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={email}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Phone Number"
                  InputProps={{ name: 'phoneNumber' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={phoneNumber}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rowsMax="4"
                  label="Address"
                  InputProps={{ name: 'address' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={address}
                  variant="outlined"

                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Referred By"
                  InputProps={{ name: 'referredBy' }}
                  className={classes.textField}
                  value={referredBy}
                  onChange={this.onChange}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select "
                  margin="normal"
                  variant="outlined"
                >
                  {referreds.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.return}

            >
              Add New
               </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/vendors" variant="body2">
                  Cancel
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>

    );
  }
}

export default withStyles(styles)(withRouter(Create));
