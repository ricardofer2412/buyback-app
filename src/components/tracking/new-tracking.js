import React, { Component } from "react"
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';


class NewTracking extends Component {


  constructor() {

    super();

    this.ref = firebase.firestore().collection('trackings');

    this.state = {

      trackingNum: '',

      vendorName: '',

      trackingStatus: ''

    };

  }

  onChange = (e) => {

    const state = this.state

    state[e.target.name] = e.target.value;

    this.setState(state);

  }


  onSubmit = (e) => {

    e.preventDefault();


    const {

      trackingNum,
      vendorName,
      trackingStatus

    } = this.state;


    this.ref.add({

      trackingNum,
      vendorName,
      trackingStatus

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


  render() {

    const {
      trackingNum,
      vendorName,
      trackingStatus } = this.state;

    return (

      <div class="container">

        <div class="panel panel-default">

          <div class="panel-heading">

            <h3 class="panel-title">

              ADD BOARD

            </h3>

          </div>

          <div class="panel-body">

            <h4><Link to="/" class="btn btn-primary">Add tracking</Link></h4>

            <form onSubmit={this.onSubmit}>

              <div class="form-group">

                <label for="title">Tracking:</label>

                <input type="text" class="form-control" name="trackingNum" value={trackingNum} onChange={this.onChange} placeholder="Tracking" />

              </div>

              <div class="form-group">

                <label for="author">Vendor:</label>

                <input type="text" class="form-control" name="vendorName" value={vendorName} onChange={this.onChange} placeholder="Vendor" />

              </div>

              <div class="form-group">

                <label for="author">Status:</label>

                <input type="text" class="form-control" name="trackingStatus" value={trackingStatus} onChange={this.onChange} placeholder="Status" />

              </div>

              <button type="submit" class="btn btn-success">Submit</button>

            </form>

          </div>

        </div>

      </div>

    );

  }

}


export default NewTracking;