import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import firebase from "../firebase/Firebase";

const uuid = require("uuid");
const carriers = [
  {
    value: "AT&T",
    label: "AT&T",
    color: "red"
  },
  {
    value: "T-Mobile",
    label: "T-Mobile"
  },
  {
    value: "Sprint",
    label: "Sprint"
  },
  {
    value: "Verizon",
    label: "Verizon"
  },
  {
    value: "Unlocked",
    label: "Unlocked"
  }
];
const payment = [
  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Check",
    label: "Check"
  },
  {
    value: "Paypal",
    label: "Paypal"
  }
];
const statusList = [
  {
    value: "Pending",
    label: "Pending"
  },
  {
    value: "Completed",
    label: "Completed"
  },
  {
    value: "Tested",
    label: "Tested"
  },
  {
    value: "Paid",
    label: "Paid"
  },
  {
    value: "Entered",
    label: "Entered"
  }
];

const classes = {
  maincontainer: {
  
    display: 'flex',
    flexDiretion: 'column', 
    marginTop: 100, 
    marginRight: 200, 
    width: '100%'
    
  }, 
  topForm: {
    display: 'flex', 
    flexDiretion: 'row', 
    justifyContent: 'space-between', 
    marginTop: 50
  
  }, 
  paper: {
    width: '100%'
  }
}

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("purchaseOrders");
    this.customerRef =  firebase.firestore().collection('customers')
    this.state = {
      purchaseOrderId: '', 
      company: "",
      deviceTotal: 0.0,
      poDate: new Date(),
      poNumber: "",
      poTotal: "",
      email: "",
      address: "",
      expectDeliver: "",
      status: "",
      typePayment: "",
      phoneNumber: "",
      vendorName: "",
      deviceModel:'', 
      devicePrice: '', 
      deviceQty: '', 
      deviceComments: '', 
      deviceDeduction: '', 
      newDeviceList: [], 
      deviceTotal: ''
    };
  }
  componentDidMount = () => {

  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleDeviceChange = (e, idx) => {
    const devices = [...this.state.devices];
    devices[idx] = e.target.value;
    this.setState({devices});
  };


  addNewDevice = (e) => {
    e.preventDefault()
    const newDeviceList = [...this.state.newDeviceList,
    { qty: this.state.deviceQty, phoneModel: this.state.deviceModel, price: this.state.devicePrice, deviceTotal: this.state.devicePrice * this.state.deviceQty }]
    const deviceId = uuid()
    firebase.firestore()
    .collection("devices")
    .doc(deviceId)
    .set({
      qty: this.state.deviceQty,
      deviceId: deviceId,
      phoneModel: this.state.deviceModel,
      price: this.state.devicePrice, 
      deviceTotal: this.state.deviceTotal, 
      comments: this.state.deviceComments
    })
      .then(res => {
        this.setState({
        
          qty: "", 
          phoneModel: "", 
          price: "", 
          comments: ""
        })
      })
  }

  handleDateChange = date => {
    this.setState({ poDate: date });
  };
  onSubmit = e => {
 
    const purchaseOrderId =  uuid();
    const customerId =  uuid();
    e.preventDefault();
    const {
      company,
      vendorName,
      poNumber,
      email,
      phoneNumber,
      status,
      typePayment,
      poDate,
      quantity
    } = this.state;
   
    this.customerRef.doc(purchaseOrderId)
      .set({  
        customerId,
        company,
        vendorName,
        poNumber,
        email,
        phoneNumber,
        status,
        typePayment,
        poDate,
      })
      .then(() => {
        this.props.history.push("/purchaseorders");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
      this.deviceRef.add({


          deviceModel: this.state.deviceModel, 
          devicePrice: this.state.devicePrice, 
          deviceQty: this.state.deviceQty, 
          deviceComments: this.state.deviceComments, 
          deviceDeduction: this.state.deviceDeduction, 
        }).then(() => {
          console.log("Device Added")
          console.log("Device Model: "+ this.state.deviceModel)
         
        })
  };

  render() {
    const {
      company,
      vendorName,
      poNumber,
      email,
      phoneNumber,
      status,
      typePayment,
      poDate,
      quantity, 
      deviceModel, 
      deviceQty, 
      devicePrice, 
      deviceComments, 
      
    } = this.state;



    return (

        <Container style={classes.maincontainer}>
      
          <Container>
          <Paper style={classes.paper} >
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
             <Container style={classes.topForm}>
                  <TextField
                    required
                    label="Company"
                    InputProps={{ name: "company" }}
                   
                    onChange={this.onChange}
                    value={company}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
             
                  <TextField
                    required
                    label="Vendor Name"
                    InputProps={{ name: "vendorName" }}
                 
                    onChange={this.onChange}
                    value={vendorName}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
                
                  <TextField
                    required
                    label="PO Number"
                    InputProps={{ name: "poNumber" }}
                
                    onChange={this.onChange}
                    value={poNumber}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
          </Container>
          <Container style={classes.topForm}>
                  <TextField
                    required
                    label="E-Mail"
                    InputProps={{ name: "email" }}
                   
                    onChange={this.onChange}
                    value={email}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
            
                  <TextField
                    required
                    label="Phone Number"
                    InputProps={{ name: "phoneNumber" }}
                   
                    onChange={this.onChange}
                    value={phoneNumber}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
               
                  <TextField
                    style={{ width: 250 }}
                    select
                    label="Status"
                    InputProps={{ name: "status" }}
                  
                    value={status}
                    defaultValue={poDate}
                    onChange={this.onChange}
                    SelectProps={{
                      MenuProps: {
                    
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    {statusList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
             </Container>
             <Container style={classes.topForm}>
                  <TextField
                    style={{ width: 250 }}
                    id="poDate"
                    label="Date"
                    type="date"
                  
                    InputProps={{
                      name: "poDate"
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={poDate}
                    variant="outlined"
                    onChange={this.onChange}
                  />
             
                  <TextField
                    select
                    label="Payment Type"
                    InputProps={{ name: "typePayment" }}
                    
                    value={typePayment}
                    onChange={this.onChange}
                    style={{ width: 250 }}
                    SelectProps={{
                      MenuProps: {
                      
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    {payment.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  </Container>
              <Divider />
              <Container style={classes.topForm}>
              <TextField
                    required
                    label="Qty"
                    InputProps={{ name: "deviceQty" }}
                  
                    onChange={this.onChange}
                    value={deviceQty}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
                  <TextField
                    required
                    label="Phone model"
                    InputProps={{ name: "deviceModel" }}
                  
                    onChange={this.onChange}
                    value={deviceModel}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
                 
                  <TextField
                    required
                    label="Comments"
                    InputProps={{ name: "deviceComments" }}
                    
                    onChange={this.onChange}
                    value={deviceComments}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
                  <TextField
                    required
                    label="Price"
                    InputProps={{ name: "devicePrice" }}
                    
                    onChange={this.onChange}
                    value={devicePrice}
                    variant="outlined"
                    style={{ width: 250 }}
                  />
                  <Button
                  style={{ margin: 25 }}
                  type="Add Device"
                  variant="contained"
                  onClick={this.addNewDevice}
                  color="primary"
                >
                 Add Device
                </Button>
         </Container>
              <div >
                <Button
                  style={{ margin: 25 }}
                  type="submit"
                  variant="contained"
                
                  onClick={this.return}
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </form>
          
          </Paper>
          </Container>
        </Container>
     
    );
  }
}

export default (withRouter(NewOrder));
