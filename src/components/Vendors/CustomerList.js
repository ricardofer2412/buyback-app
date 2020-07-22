import React from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase/Firebase.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Create, Visibility } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';

import NavBar from '../NavBar/NavBar'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  fab: {
    margin: 5,
    marginTop: -20,
    padding: 5,
    weight: 40,
    color: 'white',
    background: '#76C63A'

  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    textAlign: 'center',
    justify: 'center'
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',

  },



});

const vendorCount = 0;


class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("customers");
    this.unsubscribe = null;
    this.state = {
      customers: [],
      key: false,
    };
  }

  onCollectionUpdate = querySnapshot => {

    const customers = [];
    querySnapshot.forEach(doc => {
      const { vendorName, firstName, lastName, phoneNumber, email } = doc.data();
      customers.push({
        customerId: doc.id,
        doc,
        vendorName,
        firstName,
        lastName,
        phoneNumber,
        email
      });
    });

    this.setState({
      customers
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


  delete = customer => {
    const { customerId } = customer;
    console.log("key: ", customerId, "customer", customer);
    firebase
      .firestore()
      .collection("customers")
      .doc(customerId)
      .delete()
      .then(() => {
        console.log("Customer Deleted");
        this.props.history.push("/vendors");
      })
      .catch(error => {
        console.error("Error deleting customer: ", error);
      });
  };

  render() {
    const { classes } = this.props

    console.log({ vendorCount })

    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <h1>{this.state.vendorCount}</h1>
            <Fab
              variant="extended"
              component={Link} to="/vendors/new"
              color="secondary"
              aria-label="Add"
              className={classes.fab}
            >
              <AddIcon className={classes.extendedIcon} />
            </Fab>
            <Paper >
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell> Phone Number</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.customers.map(customer => (
                    < TableRow >
                      <TableCell>{customer.vendorName}</TableCell>
                      <TableCell>{customer.phoneNumber}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => this.delete(customer)} aria-label="Delete" >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          component={Link} to={`/edit/${customer.customerId}`}

                        >
                          <Create />
                        </IconButton>
                        <IconButton
                          component={Link} to={`/show/${customer.customerId}`}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Container >
        </main>

      </div>
    );
  }
}

export default withStyles(styles)(withRouter(CustomerList));