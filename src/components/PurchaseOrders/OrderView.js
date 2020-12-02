import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Typography, TableContainer } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { storage } from "../firebase/Firebase";
import ImageUploader from "../ImageUploader/ImageUploader";
import axios from "axios";
import { apiEndpoint } from "../../config.js";
import "./orderview.css";
import BuyBackForm from "../BuyBackForm/index";
import Modal from "@material-ui/core/Modal";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { PlayCircleFilledWhite, Computer } from "@material-ui/icons";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ComputerIcon from "@material-ui/icons/Computer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import BackspaceIcon from "@material-ui/icons/Backspace";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import logo from './sources/mslogo.png'


const carriers = [
  {
    value: "AT&T",
    label: "AT&T",
    color: "red",
  },
  {
    value: "T-Mobile",
    label: "T-Mobile",
  },
  {
    value: "Sprint",
    label: "Sprint",
  },
  {
    value: "Verizon",
    label: "Verizon",
  },
  {
    value: "Unlocked",
    label: "Unlocked",
  },
];
const payment = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Check",
    label: "Check",
  },
  {
    value: "Paypal",
    label: "Paypal",
  },
];
const statusList = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Complete",
    label: "Complete",
  },
  {
    value: "Tested",
    label: "Tested",
  },
  {
    value: "Paid",
    label: "Paid",
  },
  {
    value: "Entered",
    label: "Entered",
  },
  {
    value: "Received",
    label: "Received",
  },
];

const uuid = require("uuid");

const EMPTY_DEVICE = {
  deviceImei: "",
  deviceCarrier: "",
  comments: "",
  deviceId: "",
  deviceQty: "",
  phoneModel: "",
  devicePrice: "",
  deviceTotal: "",
  deviceMemory: ''
};
const classes = {
  topForm: {
    display: "flex",
    flexDiretion: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  total: {
    display: "flex",
    flexDiretion: "row",
    justifyContent: "flex-end",
  },

  backButton: {
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  saveButton: {
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#00e676",
    color: "white",
  },
  importedList: {
    height: 2,
    width: "100%",
    overflow: "auto",
  },
  gridList: {
    width: 500,
    height: 450,
  },
};

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderId: "",
      company: "",
      deviceTotal: "",
      poDate: "",
      poNumber: "",
      poTotal: "0.00",
      quantity: "",
      email: "",
      address: "",
      expectDeliver: "",
      status: "",
      typePayment: "",
      phoneNumber: "",
      carrier: "",
      devicePrice: "",
      deviceCarrier: "",
      deviceModel: "",
      deviceImei: "",
      deviceMemory: "", 
      deviceInvoiceNum: "",
      vendorName: "",
      deviceList: [{ ...EMPTY_DEVICE }],
      importedDeviceList: [],
      image: null,
      url: "",
      progress: 0,
      expectPayDate: "",
      receivedEmailDate: "",
      processOrderDate: "",
      paymentEmailDate: "",
      pictureGallery: [],
      open: false,
      pictureGalleryCount: "0",
    };

   
  }

  componentDidMount() {
    try {
      const ref = firebase
        .firestore()
        .collection("purchaseOrders")
        .doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          console.log("Loading");
          const purchaseOrders = doc.data();
          const deviceList = doc.data().deviceList;
          const newDeviceList = [...deviceList];
          this.setState({
            purchaseOrderId: doc.id,
            company: purchaseOrders.company,
            poDate: purchaseOrders.poDate,
            poNumber: purchaseOrders.poNumber,
            poTotal: purchaseOrders.poTotal,
            email: purchaseOrders.email,
            address: purchaseOrders.address,
            expectDeliver: purchaseOrders.expectDeliver,
            status: purchaseOrders.status,
            typePayment: purchaseOrders.typePayment,
            phoneNumber: purchaseOrders.phoneNumber,
            deviceList: newDeviceList,
            vendorName: purchaseOrders.vendorName,
            deviceTotal: purchaseOrders.deviceTotal,
            url: purchaseOrders.url,
            expectPayDate: purchaseOrders.expectPayDate,
            receivedEmailDate: purchaseOrders.receivedEmailDate,
            processOrderDate: purchaseOrders.processOrderDate,
            paymentEmailDate: purchaseOrders.paymentEmailDate,
            pictureGallery: purchaseOrders.pictureGallery,
            deviceMemory: purchaseOrders.deviceMemory
   
          });
        } else {
          console.log("Order does not exist!");
        }
      });
    } catch (e) {
      console.log("ERROR getting info: ", e);
    }
  }
 








  render() {
    const {
      deviceModel,
      deviceQty,
      devicePrice,
      deviceComments,
      deviceCarrier,
    } = this.state;

    return (
      <div className='main'>
         <div className='paper'>
             <div className='header'>
                 <div className='logo'>
                  <img src={logo} alt="logo"
                    style={{ width: 100, height: 100 }}/>
                 </div>
                 <div className="poNumber">
                     <h3 className="poNumber_text">Purchase Order #: {this.state.poNumber} </h3>

                 </div>

             </div> 
             <div className="customerInfo">
                 <div className='mobilesourceInfo'>
                    <h3>MobileSource Corp.</h3>
                    <p style={{fontSize: '20px'}}>3500 NW 2nd Ave <br></br>Suite# 603<br></br> Boca Raton, FL, 33431</p>
                 </div>
                 <div className='customerInfo'>
                   <p>Company: {this.state.company} <br></br> Vendor Name:{this.state.vendorName}<br></br> {this.state.phoneNumber}<br></br>{this.state.email}</p>
                 </div>

             </div>

         </div>
      </div>
    );
  }
}

export default withRouter(ViewOrder);
