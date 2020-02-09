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
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },

  container: {
    marginTop: 64,
  }
  ,
}));



class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("customers");
    this.unsubscribe = null;
    this.state = {
      customers: [],
      key: false
    };
  }

  onCollectionUpdate = querySnapshot => {
    const customers = [];
    querySnapshot.forEach(doc => {
      const { firstName, lastName, phoneNumber, email } = doc.data();
      customers.push({
        customerId: doc.id,
        doc,
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
    const classes = useStyles
    return (
      <Container
        style={{ marginTop: 68 }}
      >
        <Fab
          variant="extended"
          component={Link} to="/Create"
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
                <TableCell>First Name</TableCell>
                <TableCell> Last Name </TableCell>
                <TableCell> Phone Number</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers.map(customer => (
                <TableRow>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
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
      </Container>
    );
  }
}

export default CustomerList;
