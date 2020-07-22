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
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import firebase from "../firebase/Firebase";
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';



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



  },
  topForm: {
    display: 'flex',
    flexDiretion: 'row',
    justifyContent: 'space-between',
    marginTop: 50

  },
  paper: {

  }
}


class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("purchaseOrders");
    this.customerRef = firebase.firestore().collection('customers')
    this.state = {
      purchaseOrderId: '',
      company: "",
      deviceTotal: "",
      poDate: new Date(),
      poNumber: "",
      poTotal: "$0.00",
      email: "",
      address: "",
      expectDeliver: "",
      status: "",
      typePayment: "",
      phoneNumber: "",
      vendorName: "",
      deviceModel: '',
      devicePrice: '',
      deviceQty: '',
      deviceComments: '',
      deviceDeduction: '',
      deviceList: [],

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
    this.setState({ devices });
  };


  addNewDevice = (e) => {
    e.preventDefault()
    const deviceId = uuid()
    const newItem = { comments: this.state.deviceComments, deviceId: deviceId, qty: this.state.deviceQty, phoneModel: this.state.deviceModel, price: this.state.devicePrice, deviceTotal: this.state.devicePrice * this.state.deviceQty }
    const newDeviceList = [...this.state.deviceList, newItem]
    let poTotal = 0
    for (let i = 0; i < newDeviceList.length; i++) {
      poTotal += newDeviceList[i].deviceTotal

    }
    poTotal = poTotal.toFixed(2)

    firebase.firestore()
      .collection("devices")
      .doc(deviceId)
      .set(newItem)
      .then((res) => {
        this.setState({
          deviceList: newDeviceList,
          deviceQty: "",
          deviceModel: "",
          devicePrice: "",
          deviceComments: "",
          poTotal
        })
      })
  }

  deleteItem = (id, itemId) => {
    const deviceList = Object.assign([], this.state.deviceList)
    console.log(id)
    deviceList.splice(id, 1)


    firebase.firestore().collection("devices").doc(itemId)
      .delete()
      .then((res) => {
        this.setState({
          deviceList
        })

      })
  }
  addCustomer() {
    const newCustomer = { company: this.state.company, vendorName: this.state.vendorName, email: this.state.email, phoneNumber: this.state.phoneNumber }
    firebase.firestore().collection("customers").add(newCustomer)

  }


  handleDateChange = date => {
    this.setState({ poDate: date });
  };
  onSubmit = e => {
    const purchaseOrderId = uuid();
    const customerId = uuid();
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
      deviceList,
      poTotal

    } = this.state;
    this.addCustomer()
    this.ref.doc(purchaseOrderId)
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
        deviceList,
        poTotal
      })
      .then(() => {
        this.props.history.push("/purchaseorders");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });

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
      deviceModel,
      deviceQty,
      devicePrice,
      deviceComments,


    } = this.state;



    return (

      <Container style={classes.maincontainer}>


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

            <TableContainer style={classes.topForm} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell align="right">MODEL</TableCell>
                    <TableCell align="right">Comments</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.deviceList.map((item, i) => (
                    <TableRow key={i} >
                      <TableCell component="th" scope="row">
                        {item.qty}
                      </TableCell>
                      <TableCell align="right">{item.phoneModel}</TableCell>
                      <TableCell align="right">{item.comments}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.deviceTotal}</TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => this.deleteItem(i, item.deviceId)}
                          variant="contained"
                          style={{ color: "#144864", cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableCell>
                    <TextField
                      required
                      label="Qty"
                      InputProps={{ name: "deviceQty" }}

                      onChange={this.onChange}
                      value={deviceQty}
                      variant="outlined"
                      style={{ width: 250 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      required
                      label="Phone model"
                      InputProps={{ name: "deviceModel" }}

                      onChange={this.onChange}
                      value={deviceModel}
                      variant="outlined"
                      style={{ width: 250 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      required
                      label="Comments"
                      InputProps={{ name: "deviceComments" }}

                      onChange={this.onChange}
                      value={deviceComments}
                      variant="outlined"
                      style={{ width: 250 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      required
                      label="Price"
                      InputProps={{ name: "devicePrice" }}

                      onChange={this.onChange}
                      value={devicePrice}
                      variant="outlined"
                      style={{ width: 250 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ margin: 25 }}
                      type="Add Device"
                      variant="contained"
                      onClick={this.addNewDevice}
                      color="primary"
                    >
                      Add Device
                </Button>
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>

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
              <Typography>{this.state.poTotal}</Typography>
            </div>
          </form>

        </Paper>

      </Container>

    );
  }
}

export default (withRouter(NewOrder));
