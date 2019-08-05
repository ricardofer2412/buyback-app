import React, { Component } from 'react';
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('customers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const customer = doc.data();
        this.setState({
          key: doc.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
          email: customer.email
        });
      } else {
        console.log("Customer does not exist!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ customer: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, email } = this.state;

    const updateRef = firebase.firestore().collection('customers').doc(this.state.key);
    updateRef.set({
      firstName,
      lastName,
      phoneNumber,
      email
    }).then((docRef) => {
      this.setState({
        key: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      });
      this.props.history.push("/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT CUSTOMER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Customer's List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Firt Name:</label>
                <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="title">Last Name:</label>
                <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="title">Phone Number:</label>
                <input type="text" class="form-control" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} placeholder="Phone Number" />
              </div>
              <div class="form-group">
                <label for="title">E-mail:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-mail" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
              <Button
                variant="contained"
                color="secondary"
                component={Link} to="/purchaseorder/New">
                Back
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

