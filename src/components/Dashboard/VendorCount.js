import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import firebase from "../firebase/Firebase.js";
import { Divider } from "@material-ui/core";
import "./app.css";
import ViewListIcon from "@material-ui/icons/ViewList";

const styles = (theme) => ({
  depositContext: {
    flex: 1,
  },
  titleText: {
    color: "#708096",
    fontSize: 18,
  },
  countText: {
    color: "black",
    fontSize: 30,
    marginLeft: 10,
  },
  iconStyle: {
    color: "#150452",
    float: "right",
    marginTop: 15,
    marginRight: 15,
    fontSize: 40,
  },
  countTextView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

class VendorCount extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("customers");
    this.state = {
      vendorCount: "",
    };
  }

  componentDidMount = () => {
    this.ref
      .get()
      .then((querySnapshot) => {
        this.customerCount = querySnapshot.size;
      })
      .then((querySnapshot) => {
        this.setState({
          vendorCount: this.customerCount,
        });
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className="card-div">
        <div className="title-div-card">
          <h3 className="title">Vendors</h3>
          <h4 className="vendor-count">{this.customerCount}</h4>
        </div>
        <div className="icon-div">
          <AccountCircleIcon className="icon" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(VendorCount));
