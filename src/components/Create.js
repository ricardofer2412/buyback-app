import React, { Component } from "react";
import firebase from "./firebase/Firebase";
import { Link } from "react-router-dom";



const uuid = require("uuid");

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("customers");
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, email } = this.state;
    const customerId = uuid();

    console.log("customerId: ", customerId);
    this.ref
      .doc(customerId)
      .set({
        firstName,
        lastName,
        phoneNumber,
        email,
        customerId
      })
      .then(() => {
        this.setState({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          emai: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { firstName, lastName, phoneNumber, email } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">ADD Customer</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/" className="btn btn-primary" />
            </h4>
            <form onSubmit={this.onSubmit}>
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
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
