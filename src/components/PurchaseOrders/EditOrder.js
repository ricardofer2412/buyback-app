import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import Button from '@material-ui/core/Button';
import {
  withRouter
} from 'react-router-dom';
import Container from "@material-ui/core/Container";

import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField"
import { Typography, TableContainer } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"

import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { storage } from '../firebase/Firebase'
import ImageUploader from '../ImageUploader/ImageUploader'
import axios from "axios";
import { apiEndpoint } from "../../config.js";



const carriers = [
  {
    value: "AT&T",
    label: "AT&T",
    color: 'red'
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
]
const payment = [
  {
    value: 'Cash',
    label: 'Cash'
  },
  {
    value: 'Check',
    label: 'Check'
  },
  {
    value: 'Paypal',
    label: 'Paypal'
  }
]
const statusList = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Complete',
    label: 'Complete'
  },
  {
    value: 'Tested',
    label: 'Tested'
  },
  {
    value: 'Paid',
    label: 'Paid'
  },
  {
    value: 'Entered',
    label: 'Entered'
  }, {
    value: 'Received',
    label: 'Received'
  },

]


const uuid = require("uuid");

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
    marginTop: 15,
    marginBottom: 30,
  },
  total: {
    display: 'flex',
    flexDiretion: 'row',
    justifyContent: 'flex-end'
  },
  paperMain: {
    marginRight: 20,
    width: '100%'
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
    backgroundColor: '#00e676',
    color: 'white'
  }
}

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderId: '',
      company: "",
      deviceTotal: '',
      poDate: '',
      poNumber: "",
      poTotal: "0.00",
      quantity: '',
      email: "",
      address: "",
      expectDeliver: "",
      status: "",
      typePayment: '',
      phoneNumber: "",
      carrier: '',
      devicePrice: '',
      deviceCarrier: '',
      deviceModel: '',
      deviceImei: '',
      vendorName: '',
      deviceList: [],
      image: null,
      url: '',
      progress: 0,
      expectPayDate: ""

    };

    this.receivedOrderEmail = this.receivedOrderEmail.bind(this)
    this.paymentEmail = this.paymentEmail.bind(this)
    this.orderProcess = this.orderProcess.bind(this)

  }
  componentDidMount() {
    const ref = firebase.firestore().collection('purchaseOrders').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        console.log("Loading")
        const purchaseOrders = doc.data();
        const deviceList = doc.data().deviceList
        const newDeviceList = [...deviceList]
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
          expectPayDate: purchaseOrders.expectPayDate

        });
      } else {
        console.log("Order does not exist!");
      }
    });
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

  addNewDevice = (e) => {
    e.preventDefault()
    const deviceId = uuid()
    const newItem = { deviceCarrier: this.state.deviceCarrier, comments: this.state.deviceComments, deviceId: deviceId, qty: this.state.deviceQty, phoneModel: this.state.deviceModel, price: this.state.devicePrice, deviceTotal: this.state.devicePrice * this.state.deviceQty }
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
          deviceCarrier: "",
          poTotal,
        })
      })
  }
  handleUrlChange = (url) => {
    this.setState({ url });
  }

  handleDateChange = date => {
    this.setState({ poDate: date, expectPayDate: date });
  };

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ purchaseOrder: state });
  }

  async receivedOrderEmail(e) {
    e.preventDefault();
    console.log('Received email sent')
    const { email, vendorName, url } = this.state
    console.log(email)
    const receivedEmail = await axios.post(`${apiEndpoint}/api/receivedEmail`, {
      email,
      vendorName,
      url
    })
  }
  async paymentEmail(e) {
    e.preventDefault();
    const { email, vendorName, url } = this.state
    console.log(email)
    const paymentEmail = await axios.post(`${apiEndpoint}/api/paymentEmail`, {
      email,
      vendorName,
      url
    })
  }
  async orderProcess(e) {
    e.preventDefault();
    const { email, vendorName, url } = this.state
    console.log(email)
    const orderProcess = await axios.post('/api/orderProcess', {
      email,
      vendorName,
      url
    })
  }


  onSubmit = (e) => {
    e.preventDefault();
    const {
      company,
      purchaseOrderId,
      poDate,
      poNumber,
      poTotal,
      quantity,
      email,
      status,
      typePayment,
      phoneNumber,
      vendorName,
      deviceList,
      url,
      expectPayDate } = this.state;

    firebase.firestore().collection('purchaseOrders').doc(this.props.match.params.id).set({
      company,
      purchaseOrderId,
      poDate,
      poNumber,
      poTotal,
      quantity,
      email,
      status,
      typePayment,
      phoneNumber,
      vendorName,
      deviceList,
      url,
      expectPayDate
    }).then(() => {
      this.props.history.push("/purchaseorders")
    })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }

  render() {


    const {
      deviceModel,
      deviceQty,
      devicePrice,
      deviceComments,
      deviceCarrier
    } = this.state;

    return (

      <Container style={classes.maincontainer}>
        <Paper style={classes.paperMain} >
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Container style={classes.topForm}>
              <TextField
                required
                label="Company"
                InputProps={{ name: 'company' }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.company}
                variant="outlined"
                style={{ width: 250 }}
              />

              <TextField
                required
                label="Vendor Name"
                InputProps={{ name: 'vendorName' }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.vendorName}
                variant="outlined"
                style={{ width: 250 }}
              />

              <TextField
                required
                label='PO Number'
                InputProps={{ name: 'poNumber' }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.poNumber}
                variant="outlined"
                style={{ width: 250 }}
              />
            </Container>
            <Container style={classes.topForm}>
              <TextField
                required
                label="E-Mail"
                InputProps={{ name: 'email' }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.email}
                variant="outlined"

                style={{ width: 250 }}
              />

              <TextField
                required
                label="Phone Number"
                InputProps={{ name: 'phoneNumber' }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.phoneNumber}
                variant="outlined"

                style={{ width: 250 }}
              />

              <TextField
                select
                label="Status"
                InputProps={{ name: 'status' }}
                className={classes.textField}
                value={this.state.status}
                onChange={this.onChange}

                style={{ width: 250 }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select "
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

                id="poDate"
                label="Date"
                type="date"
                className={classes.textField}
                InputProps={{
                  name: 'poDate'
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.poDate}
                variant="outlined"
                onChange={this.onChange}
                style={{ width: 250 }}
              />
              <TextField
                style={{ width: 250 }}
                id="expectPayDate"
                label="Expected Pay Date"
                type="date"
                className={classes.textField}
                InputProps={{
                  name: "expectPayDate"
                }}
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.expectPayDate}
                variant="outlined"
                onChange={this.onChange}
              />

              <TextField
                select
                label="Payment Type"
                InputProps={{ name: 'typePayment' }}
                className={classes.textField}
                value={this.state.typePayment}
                onChange={this.onChange}

                style={{ width: 250 }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select "
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
            <TableContainer style={classes.topForm}   >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell align="right">Carrier</TableCell>
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
                      <TableCell align="right">{item.deviceCarrier}</TableCell>
                      <TableCell align="right">{item.phoneModel}</TableCell>
                      <TableCell align="right">{item.comments}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.deviceTotal}</TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => this.deleteItem(i, item.deviceId)}
                          variant="contained"
                          style={{ color: "#ff1744", cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Container style={classes.topForm}>
              <TextField
                required
                label="Qty"
                InputProps={{ name: "deviceQty" }}

                onChange={this.onChange}
                value={deviceQty}
                variant="outlined"
                style={{ width: 75 }}
              />

              <TextField
                select
                label="Carrier"
                InputProps={{ name: "deviceCarrier" }}
                value={deviceCarrier}
                onChange={this.onChange}
                style={{ width: 150, marginTop: 0 }}
                SelectProps={{
                  MenuProps: {
                  }
                }}
                margin="normal"
                variant="outlined"
              >
                {carriers.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                label="Phone model"
                InputProps={{ name: "deviceModel" }}

                onChange={this.onChange}
                value={deviceModel}
                variant="outlined"
                style={{ width: 175 }}
              />

              <TextField
                required
                label="Comments"
                InputProps={{ name: "deviceComments" }}

                onChange={this.onChange}
                value={deviceComments}
                variant="outlined"
                style={{ width: 175 }}
              />

              <TextField
                required
                label="Price"
                InputProps={{ name: "devicePrice" }}

                onChange={this.onChange}
                value={devicePrice}
                variant="outlined"
                style={{ width: 100 }}
              />

              <AddIcon
                style={{ margin: 25, cursor: 'pointer' }}
                variant="contained"
                onClick={this.addNewDevice}
                color="primary"
              />
            </Container>

            <Container style={classes.total}>
              <Typography style={{ color: 'gray', fontSize: 30 }}>
                Total: ${this.state.poTotal}
              </Typography>
            </Container>
            <Container style={classes.total}>
              <Button
                style={classes.backButton}
                variant="contained"
                color="secondary"
                component={Link} to="/purchaseorders/">
                Back
              </Button>
              <Button
                style={classes.saveButton}
                type="submit"
                variant="contained"
                className={classes.submit}
                onClick={this.onSubmit}
                color="primary">
                Save
              </Button>
              <button onClick={this.receivedOrderEmail}>
                Recived Order
              </button>
              <button onClick={this.paymentEmail}>
                Payment Sent
              </button>
              <button onClick={this.orderProcess}>
                Order Process
              </button>

            </Container>

          </form>

        </Paper>
        <Paper style={classes.paper} >
          <ImageUploader imageUrl={this.state.url} handleUrlChange={this.handleUrlChange} />

          {this.state.url != null ?
            <div>
              <img src={this.state.url} alt="Uploaded Images" height="200" width="200" style={{ marginTop: 15, marginLeft: 5 }} />
            </div>
            :
            <div>

            </div>
          }
        </Paper>
      </Container>
    );
  }
}


export default (withRouter(EditOrder));

