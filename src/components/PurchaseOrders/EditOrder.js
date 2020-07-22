import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import Button from '@material-ui/core/Button';
import {
  withRouter
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField"
import { Typography, TableContainer } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import DeleteIcon from '@material-ui/icons/Delete';

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
    value: 'Completed',
    label: 'Completed'
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
}
]


const uuid = require("uuid");

const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 6,
    textAlign: 'left',
    display: "flex",
    flexDirection: 'column',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 20
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderId: '',
      company: "",
      deviceTotal: '',
      poDate: '',
      poNumber: "",
      poTotal: "",
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
      deviceList: []

    };
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

  handleDateChange = date => {
    this.setState({ poDate: date });
  };

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ purchaseOrder: state });
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
      deviceList } = this.state;

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
      deviceList
    }).then(() => {
      this.props.history.push("/purchaseorders")
    })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }

  render() {

    const { classes } = this.props;
    const {

      deviceModel,
      deviceQty,
      devicePrice,
      deviceComments,


    } = this.state;

    return (

      <div className={classes.root}>
        <NavBar />
        {console.log(this.state)}
        <Typography
          component="h2" m variant="display4">
          Purchase Order: {this.state.poNumber}
        </Typography>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Company"
                  InputProps={{ name: 'company' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={this.state.company}
                  variant="outlined"
                  width={400}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Vendor Name"
                  InputProps={{ name: 'vendorName' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={this.state.vendorName}
                  variant="outlined"
                  width={400}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label='PO Number'
                  InputProps={{ name: 'poNumber' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={this.state.poNumber}
                  variant="outlined"
                  width={400}
                />
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <TextField
                  required
                  label="E-Mail"
                  InputProps={{ name: 'email' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={this.state.email}
                  variant="outlined"

                  width={400}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Phone Number"
                  InputProps={{ name: 'phoneNumber' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={this.state.phoneNumber}
                  variant="outlined"

                  width={400}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Status"
                  InputProps={{ name: 'status' }}
                  className={classes.textField}
                  value={this.state.status}
                  onChange={this.onChange}

                  width={400}
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
              </Grid>
            </Grid>
            <Grid container spacing={8}>

              <Grid item xs={4}>
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
                  width={400}
                />
              </Grid>

              <Grid item xs={4}>

              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Payment Type"
                  InputProps={{ name: 'typePayment' }}
                  className={classes.textField}
                  value={this.state.typePayment}
                  onChange={this.onChange}

                  width={400}
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

              </Grid>
            </Grid>




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
            <div className={classes.inputContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                onClick={this.onSubmit}
                color="primary">
                Save
                        </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link} to="/purchaseorders/">
                Back
              </Button>
              <Typography>
                PO Total: {this.state.poTotal}
              </Typography>
            </div>
          </form>
        </Paper>



      </div>

    );
  }
}


export default withStyles(styles)(withRouter(EditOrder));

