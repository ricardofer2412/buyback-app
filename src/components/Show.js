import React, { Component } from 'react';
import firebase from './firebase/Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('customers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
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

  delete(id){
    firebase.firestore().collection('customers').doc(id).delete().then(() => {
      console.log("Customer successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
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
      </div>
    );
  }
}

export default Show;