import React, { Component } from 'react';
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
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
import { Create, Visibility, DockSharp } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { track } from "../../fedexservice"

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      key: '',
      trackingNums: []
    };
  }

  getTrackingNumbers = (customerId) => {
    console.log('customerId: ', customerId);
    console.log('Hi')
    firebase.firestore().collection("trackings").where("customerId", "==", customerId)
      .get()
      .then((querySnapshot) => {
        const trackingNums = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          trackingNums.push(doc.data())

        });
        console.log('trackingNums: ', trackingNums);
        this.setState({ trackingNums })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('customers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        console.log('data: ', data);
        this.getTrackingNumbers(data.customerId)
        this.setState({
          customer: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Customer Does not exists!");
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('customers').doc(id).delete().then(() => {
      console.log("Customer successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    console.log(this.state.trackingNums)
    console.log('Hi')

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4><Link to="/">Customer List</Link></h4>
          </div>
          <div className="panel-body">
            <dl>
              <dt>First Name:</dt>
              <dd>{this.state.customer.firstName}</dd>
              <dt>Last Name:</dt>
              <dd>{this.state.customer.lastName}</dd>
              <dt>Phone Number:</dt>
              <dd>{this.state.customer.phoneNumber}</dd>
              <dt>E-Mail:</dt>
              <dd>{this.state.customer.email}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>TRACKING</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.trackingNums.map(tracking => (
              <TableRow>
                <TableCell>{tracking.trackingNum}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Show;