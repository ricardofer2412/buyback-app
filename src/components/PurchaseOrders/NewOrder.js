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
  TableRow,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import firebase from "../firebase/Firebase";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ImageUploader from "../ImageUploader/ImageUploader";
import { storage } from "../firebase/Firebase";
import SaveIcon from "@material-ui/icons/Save";
import BuyBackForm from "../BuyBackForm";
import "./po.css";
const uuid = require("uuid");
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

const classes = {
  maincontainer: {
    display: "flex",
    flexDiretion: "column",
    marginTop: 100,
  },
  topForm: {
    display: "flex",
    flexDiretion: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  total: {
    display: "flex",
    flexDiretion: "column",
    justifyContent: "flex-end",
  },
  paperMain: {
    marginRight: 20,
    width: "100%",
  },
  button: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#00e676",
    color: "white",
  },
};

const EMPTY_DEVICE = {
  deviceImei: "",
  deviceCarrier: "",
  comments: "",
  deviceId: "",
  deviceQty: "",
  phoneModel: "",
  devicePrice: "",
  deviceTotal: "",
};

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("purchaseOrders");
    this.customerRef = firebase.firestore().collection("customers");
    this.state = {
      vendorName: "",
      purchaseOrderId: "",
      company: "",
      deviceTotal: "",
      poDate: new Date(),
      poNumber: "",
      poTotal: "0.00",
      email: "",
      address: "",
      expectPayDate: "",
      status: "",
      deviceModel: "",
      devicePrice: "",
      deviceQty: "",
      deviceComments: "",
      deviceDeduction: "",
      deviceCarrier: "",
      deviceImei: "",
      deviceList: [{ ...EMPTY_DEVICE }],
      importedDeviceList: [],
      image: null,
      url: "",
      progress: 0,
      typePayment: "",
      phoneNumber: "",
      pictureGallery: [],
      receivedEmailDate: "",
      processEmailDate: "",
      paymentEmailDate: "",
    };
  }
  componentDidMount = () => {};

  handleChangeImg = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
    console.log(this.state.image);
  };
  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress,
        });
        console.log(this.state.progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({
              url,
            });
          });
      }
    );
  };

  onDeviceChange = (e, i) => {
    const deviceList = JSON.parse(JSON.stringify(this.state.deviceList));
    const device = deviceList[i];
    device[e.target.name] = e.target.value;
    deviceList.splice(i, 1, device);
    this.setState({ deviceList });
  };
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleDeviceChange = (e, idx) => {
    const devices = [...this.state.devices];
    devices[idx] = e.target.value;
    this.setState({ devices });
  };

  // addNewDevice = (e) => {
  //   e.preventDefault();
  //   const deviceId = uuid();
  //   const newItem = {
  //     deviceImei: this.state.deviceImei,
  //     deviceCarrier: this.state.deviceCarrier,
  //     comments: this.state.deviceComments,
  //     deviceId: deviceId,
  //     qty: this.state.deviceQty,
  //     phoneModel: this.state.deviceModel,
  //     price: this.state.devicePrice,
  //     deviceTotal: this.state.devicePrice * this.state.deviceQty,
  //   };
  //   const newDeviceList = [...this.state.deviceList, newItem];
  //   let poTotal = 0;
  //   for (let i = 0; i < newDeviceList.length; i++) {
  //     poTotal += newDeviceList[i].deviceTotal;
  //   }
  //   poTotal = poTotal.toFixed(2);

  //   firebase
  //     .firestore()
  //     .collection("devices")
  //     .doc(deviceId)
  //     .set(newItem)
  //     .then((res) => {
  //       this.setState({
  //         deviceList: newDeviceList,
  //         deviceQty: "",
  //         deviceModel: "",
  //         devicePrice: "",
  //         deviceComments: "",
  //         deviceCarrier: "",
  //         deviceImei: "",
  //         poTotal,
  //       });
  //     });
  // };

  deleteItem = (id) => {
    const deviceList = JSON.parse(JSON.stringify(this.state.deviceList));
    console.log(id);
    console.log("deviceList: ", deviceList.length);
    deviceList.splice(id, 1);
    this.setState({ deviceList });

    // firebase
    //   .firestore()
    //   .collection("devices")
    //   .doc(itemId)
    //   .delete()
    //   .then((res) => {
    //     this.setState({
    //       deviceList,
    //     });
    //   });
  };

  addCustomer() {
    const newCustomer = {
      company: this.state.company,
      vendorName: this.state.vendorName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    firebase
      .firestore()
      .collection("customers")
      .add(newCustomer);
  }
  handleUrlChange = (url) => {
    const newImage = {
      url: url,
    };
    console.log(newImage);
    this.setState({
      url: this.state.newImage,
    });
    const newImageGallery = [...this.state.pictureGallery, newImage];
    this.setState({
      pictureGallery: newImageGallery,
      pictureGalleryCount: this.state.pictureGallery.length + 1,
    });
    console.log(this.state.pictureGallery);
  };

  onSubmit = (e) => {
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
      poTotal,
      expectPayDate,
      pictureGallery,
      receivedEmailDate,
      processEmailDate,
      paymentEmailDate,
    } = this.state;
    this.addCustomer();
    this.ref
      .doc(purchaseOrderId)
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
        poTotal,
        expectPayDate,
        pictureGallery,
        receivedEmailDate,
        processEmailDate,
        paymentEmailDate,
      })
      .then(() => {
        this.props.history.push("/purchaseorders");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  addNewDeviceRow = () => {
    const deviceList = this.state.deviceList.slice(0);
    deviceList.push({ ...EMPTY_DEVICE });
    this.setState({ deviceList });
  };

  getTotal = () => {
    const deviceList = this.state.deviceList;
    let sum = 0;
    console.log("deviceList: ", deviceList);
    for (let i = 0; i < deviceList.length; i++) {
      const { deviceQty, devicePrice } = deviceList[i];

      if (deviceQty && devicePrice) {
        sum += Number(deviceQty) * Number(devicePrice);
      }
    }

    console.log("sum: ", sum);
    return sum;
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
      deviceCarrier,
      expectPayDate,
      deviceImei,
    } = this.state;

    return (
      <div className="newOrder_container">
        <div className="purchaseOrder_title">
          <h2 className="title">New Purchase Order </h2>
        </div>
        <Paper className="newOrder_paper">
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <div className="customerInfo">
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
            </div>
            <div className="customerInfo">
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
                  MenuProps: {},
                }}
                margin="normal"
                variant="outlined"
              >
                {statusList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="customerInfo">
              <TextField
                style={{ width: 250 }}
                id="poDate"
                label="Date"
                type="date"
                InputProps={{
                  name: "poDate",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={poDate}
                variant="outlined"
                onChange={this.onChange}
              />
              <TextField
                style={{ width: 250 }}
                id="expectPayDate"
                label="Expected Pay Date"
                type="date"
                InputProps={{
                  name: "expectPayDate",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={expectPayDate}
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
                  MenuProps: {},
                }}
                margin="normal"
                variant="outlined"
              >
                {payment.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Divider />

            <TableContainer style={classes.topForm}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell align="center">Carrier</TableCell>
                    <TableCell align="center">MODEL</TableCell>
                    <TableCell align="center">IMEI</TableCell>
                    <TableCell align="center">COMMENTS</TableCell>
                    <TableCell align="center">PRICE</TableCell>
                    <TableCell align="center">TOTAL</TableCell>
                    <TableCell align="center">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <BuyBackForm
                    onChange={this.onDeviceChange}
                    deviceList={this.state.deviceList}
                    deleteItem={this.deleteItem}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Container style={classes.topForm}>
              <Button
                style={{ margin: 25, cursor: "pointer" }}
                variant="contained"
                onClick={this.addNewDeviceRow}
                color="primary"
              >
                Add New Item
              </Button>
              <Typography style={{ color: "gray", fontSize: 30 }}>
                Total: ${this.getTotal()}
              </Typography>
            </Container>
            <Divider />
            <Container style={classes.total}></Container>
            <Container style={classes.total}>
              <Button
                variant="contained"
                size="large"
                style={classes.button}
                startIcon={<SaveIcon />}
                onClick={this.onSubmit}
              >
                Save
              </Button>
            </Container>
          </form>
        </Paper>

        <Paper className="buttom_bar">
          <ImageUploader
            imageUrl={this.state.url}
            handleUrlChange={this.handleUrlChange}
          />

          {this.state.pictureGallery != null ? (
            <div>
              {this.state.pictureGallery.map((tile) => (
                <img
                  src={tile.url}
                  alt="Uploaded Images"
                  height="200"
                  width="200"
                  style={{ marginTop: 15, marginLeft: 5 }}
                />
              ))}
            </div>
          ) : (
            <div> </div>
          )}
        </Paper>
      </div>
    );
  }
}

export default withRouter(NewOrder);
