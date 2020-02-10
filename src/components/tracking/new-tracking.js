import React, { Component } from "react"
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Create from '../Vendors/Create'


const uuid = require("uuid");

class NewTracking extends Component {


  constructor() {

    super();

    this.ref = firebase.firestore().collection('trackings');
    this.customerRef = firebase.firestore().collection('customers');

    this.state = {

      trackingNum: '',

      vendorName: '',

      trackingStatus: '',

      customers: [],

      currentCustomer: false,

      open: false

    };

  }


  openDialog() {
    this.setState({ open: true });
  };
  closeDialog() {
    this.setState({ open: false });
  }

  componentDidMount() {
    this.unsubscribe = this.customerRef.onSnapshot(this.onCollectionUpdate);

  }
  onCollectionUpdate = querySnapshot => {
    const customers = [];
    querySnapshot.forEach(doc => {
      const { firstName, lastName, phoneNumber, vendorName } = doc.data();
      customers.push({
        customerId: doc.id,
        doc,
        firstName,
        lastName,
        phoneNumber,
        vendorName
      });
    });

    this.setState({
      customers,
      currentCustomer: customers[0].vendorName
    });
  };
  onChange = (e) => {

    const state = this.state

    state[e.target.name] = e.target.value;

    this.setState(state);

  }


  onSubmit = (e) => {

    e.preventDefault();

    const trackingId = uuid();

    const customer = this.state.customers.find(item => item.vendorName === this.state.currentCustomer);

    const { customerId } = customer;

    const {

      trackingNum,
      vendorName,
      trackingStatus

    } = this.state;


    this.ref.add({

      trackingNum,
      vendorName,
      trackingStatus,
      trackingId,
      customerId
    }).then((docRef) => {

      this.setState({


        trackingNum: '',
        vendorName: '',
        trackingStatus: ''

      });

      this.props.history.push("/new-tracking")

    })

      .catch((error) => {

        console.error("Error adding document: ", error);

      });

  }

  handleCustomerChange = ({ target }) => {
    const { value } = target;
    this.setState({
      currentCustomer: value
    });
  }


  render() {

    const {
      trackingNum,
      vendorName,
      trackingStatus } = this.state;

    console.log('this.state.customer:', this.state.customers);

    return (

      <div class="container">

        <div class="panel panel-default">

          <div class="panel-heading">

            <h3 class="panel-title">

              Add Tracking

            </h3>

          </div>

          <div class="panel-body">

            <h4><Link to="/" class="btn btn-primary">Add tracking</Link></h4>

            <form onSubmit={this.onSubmit}>

              <div class="form-group">

                <label for="title">Tracking:</label>

                <input type="text" class="form-control" name="trackingNum" value={trackingNum} onChange={this.onChange} placeholder="Tracking" />

              </div>
              <div>

              </div>

              <label for="title">Select Vendor:</label>
              <div>
                <Button onClick={this.openDialog.bind(this)}>Add New Vendor</Button>
                <Dialog open={this.state.open} onClose={this.state.open} onEnter={console.log("Hey.")}>
                  <Create />
                  <Button onClick={this.closeDialog.bind(this)} color="primary">
                    Cancel
            </Button>
                </Dialog>
              </div>
              <div>
                <select onChange={this.handleCustomerChange} value={this.state.currentCustomer}>
                  {this.state.customers.map(customer => (
                    <option value={customer.vendorName}>{customer.vendorName}</option>
                  ))}
                </select>
              </div>
              {/* <div class="form-group">

                <label for="author">Vendor:</label>

                <input type="text" class="form-control" name="vendorName" value={vendorName} onChange={this.onChange} placeholder="Vendor" />

              </div> */}

              {/* <div class="form-group">

                <label for="author">Status:</label>

                <input type="text" class="form-control" name="trackingStatus" value={trackingStatus} onChange={this.onChange} placeholder="Status" />

              </div> */}

              <button type="submit" class="btn btn-success">Submit</button>

            </form>

          </div>

        </div>

      </div>

    );

  }

}


export default NewTracking;