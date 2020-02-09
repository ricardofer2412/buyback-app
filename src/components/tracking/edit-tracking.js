import React, { Component } from 'react';
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class EditTracking extends Component {

  constructor(props) {

    super(props);


    this.state = {
      key: '',

      trackingNum: '',

      vendorName: '',

      trackingStatus: ''

    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('trackings').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const tracking = doc.data();
        this.setState({
          key: doc.id,
          trackingNum: tracking.trackingNum,
          vendorName: tracking.vendorName,
          trackingStatus: tracking.trackingStatus

        });
      } else {
        console.log("Tracking Does Not Exist!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ tracking: state });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { trackingNum, vendorName, trackingStatus } = this.state;

    const updateRef = firebase.firestore().collection('trackings').doc(this.state.trackingId);
    updateRef.set({
      trackingNum, vendorName, trackingStatus
    }).then((docRef) => {
      this.setState({
        key: '',
        trackingNum: '',
        vendorName: '',
        trackingStatus: ''
      });
    })
      .catch((error) => {
        console.error("Error adding tracking: ", error);
      });
  }

  render() {


    return (

      <div class="container">

        <div class="panel panel-default">

          <div class="panel-heading">

            <h3 class="panel-title">

              ADD TRACKING

          </h3>

          </div>

          <div class="panel-body">

            <h4><Link to="/" class="btn btn-primary">Add tracking</Link></h4>

            <form onSubmit={this.onSubmit}>

              <div class="form-group">

                <label for="title">Tracking:</label>

                <input type="text" class="form-control" name="trackingNum" value={this.state.trackingNum} onChange={this.onChange} placeholder="Tracking" />

              </div>

              <div class="form-group">

                <label for="author">Vendor:</label>

                <input type="text" class="form-control" name="vendorName" value={this.state.vendorName} onChange={this.onChange} placeholder="Vendor" />

              </div>

              <div class="form-group">

                <label for="author">Status:</label>

                <input type="text" class="form-control" name="trackingStatus" value={this.state.trackingStatus} onChange={this.onChange} placeholder="Status" />

              </div>

              <button type="submit" class="btn btn-success">Submit</button>

            </form>

          </div>

        </div>

      </div>

    );

  }

}


export default EditTracking;