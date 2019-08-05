import React, { Component } from "react";
import firebase from "../firebase/Firebase";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {
  withRouter
} from 'react-router-dom';

const uuid = require("uuid");

class Create extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("customers");
    this.state = {
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



    const { firstName, lastName, phoneNumber, email, company, address, referredBy } = this.state;
    const customerId = uuid();

    console.log("customerId: ", customerId);
    this.ref
      .doc(customerId)
      .set({
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
    const { firstName, lastName, phoneNumber, email, company, address, referredBy } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Vendor</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/" className="btn btn-primary" />
            </h4>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="title">Company:</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  placeholder="Company"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={this.onChange}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={this.onChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.onChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="E-Mail"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={this.onChange}
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Referred By</label>
                <input
                  type="text"
                  className="form-control"
                  name="referredBy"
                  value={referredBy}
                  onChange={this.onChange}
                  placeholder="Referred By"
                />
              </div>

              <button onClick={this.return} type="submit" className="btn btn-success">
                Submit
              </button>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  component={Link} to="/Vendors/">
                  Back
              </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Create);
