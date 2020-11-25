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
import "./po.css";
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

class EditOrder extends Component {
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
      buybackResults: []
    };

    this.receivedOrderEmail = this.receivedOrderEmail.bind(this);
    this.paymentEmail = this.paymentEmail.bind(this);
    this.orderProcess = this.orderProcess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPrice = this.getPrice.bind(this)
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

  addNewDevice = (e) => {
    e.preventDefault();
    const deviceId = uuid();
    const newItem = {
      deviceCarrier: this.state.deviceCarrier,
      comments: this.state.deviceComments,
      deviceId: deviceId,
      qty: this.state.deviceQty,
      phoneModel: this.state.deviceModel,
      price: this.state.devicePrice,
      deviceTotal: this.state.devicePrice * this.state.deviceQty,
      deviceMemory: this.state.deviceMemory,
      buybackResults: this.state.buybackResults
    };
    const newDeviceList = [...this.state.deviceList, newItem];
    let poTotal = 0;
    for (let i = 0; i < newDeviceList.length; i++) {
      poTotal += newDeviceList[i].deviceTotal;
    }
    poTotal = poTotal.toFixed(2);

    firebase
      .firestore()
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
          deviceMemory: '', 
          poTotal,
        });
      });
  };

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

  handleDateChange = (date) => {
    this.setState({ poDate: date, expectPayDate: date });
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ purchaseOrder: state });
  };

  onDeviceChange = (e, i) => {
    const deviceList = JSON.parse(JSON.stringify(this.state.deviceList));
    const device = deviceList[i];
    device[e.target.name] = e.target.value;
    deviceList.splice(i, 1, device);
    this.setState({ deviceList });
  };
  async receivedOrderEmail(e) {
    e.preventDefault();
    console.log("Received email sent");
    const { email, vendorName, pictureGallery } = this.state;

    const receivedEmail = await axios.post(apiEndpoint, {
      path: "/api/receivedEmail",
      method: "post",
      body: {
        email,
        vendorName,
        pictureGallery,
      },
    });
    this.setState({
      receivedEmailDate: new Date().toLocaleString(),
    });
    console.log(this.state.receivedEmailDate);
    alert("Email Was Sent!");

    firebase
      .firestore()
      .collection("purchaseOrders")
      .doc(this.props.match.params.id)
      .update({
        receivedEmailDate: this.state.receivedEmailDate,
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }
  async getPrice( e,carrier, model, phoneMemory) {
    e.preventDefault()
    let phoneModel = model
    console.log('Model: ', model)
    let phoneCarrier = carrier
    console.log(phoneCarrier)
    console.log(phoneMemory)
   

    
    const newUrl = apiEndpoint + "/price";
    const body = { phone: `${phoneModel}-${phoneCarrier}?capacity=${phoneMemory}` };
    try {
      const response = await axios.post(newUrl, body);
      const { data } = response;
      console.log("data: ", data);

      let all = data.filter(data=> data.condition==='good')
      this.setState({
        buybackResults: all
      })
      // for (let i = 0; i < data.length; i++) {
      //   if(data[i].condition === "good" && data[i].vendor === "The Whiz Cells"){
      //     console.log
      //   }
      // } 

      
    } catch (e) {
      console.log("ERrror getting price: ", e);
    }

    console.log(this.state.buybackResults)
  }

  async paymentEmail(e) {
    e.preventDefault();
    console.log("Received email sent");
    const { email, vendorName, url, poTotal } = this.state;

    const paymentEmail = await axios.post(apiEndpoint, {
      path: "/api/paymentEmail",
      method: "post",
      body: {
        email,
        vendorName,
        url,
        poTotal,
      },
    });
    this.setState({
      paymentEmailDate: new Date().toLocaleString(),
    });
    console.log(this.state.paymentEmailDate);
    alert("Email Was Sent!");
    firebase
      .firestore()
      .collection("purchaseOrders")
      .doc(this.props.match.params.id)
      .update({
        paymentEmailDate: this.state.paymentEmailDate,
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }
  addNewDeviceRow = () => {
    const deviceList = this.state.deviceList.slice(0);
    deviceList.push({ ...EMPTY_DEVICE });
    this.setState({ deviceList });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
  deviceInfo = async (e) => {
    e.preventDefault();
    // body: `Invoiceno=15964`,
    const poNumber = this.state.poNumber;
    const deviceList = this.state.deviceList;
    try {
      const getInfo = await axios.post(`${apiEndpoint}/phonecheck`, {
        type: "GetAllDevices",
        body: `Invoiceno=${poNumber}`,
      });

      const { data } = getInfo;

      let importedList = [];
      for (var i = 0; i < data.length; i++) {
        importedList.push({
          deviceImei: data[i].IMEI,
          deviceCarrier: data[i].Carrier,
          deviceQty: "1",
          devicePrice: "0",
          deviceModel: data[i].Model,
          deviceComments: data[i].Cosmetics,
          deviceMemory: data[i].Memory
        
        });
      }

      this.setState({
        deviceList: this.state.deviceList.concat(importedList),
      });
    } catch (e) {
      console.log("ERROR getting info: ", e);
    }
  };

  async orderProcess(e) {
    e.preventDefault();
    console.log("Received email sent");
    const { email, vendorName, url } = this.state;

    const orderProcessEmail = await axios.post(apiEndpoint, {
      path: "/api/orderProcess",
      method: "post",
      body: {
        email,
        vendorName,
        url,
      },
    });
    this.setState({
      processOrderDate: new Date().toLocaleString(),
    });
    alert("Email Was Sent!");
    console.log(this.state.processOrderDate);

    firebase
      .firestore()
      .collection("purchaseOrders")
      .doc(this.props.match.params.id)
      .update({
        processOrderDate: this.state.processOrderDate,
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  }

  getTotal = () => {
    const deviceList = this.state.deviceList;
    let sum = 0;
    for (let i = 0; i < deviceList.length; i++) {
      const { deviceQty, devicePrice } = deviceList[i];

      if (deviceQty && devicePrice) {
        sum += Number(deviceQty) * Number(devicePrice);
      }
    }
    return sum;
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.getTotal());
    const poTotal = this.getTotal();
    this.setState({
      poTotal,
    });

    const {
      company,
      purchaseOrderId,
      poDate,
      poNumber,
      quantity,
      email,
      status,
      typePayment,
      phoneNumber,
      vendorName,
      deviceList,
      expectPayDate,
      pictureGallery,
    } = this.state;

    firebase
      .firestore()
      .collection("purchaseOrders")
      .doc(this.props.match.params.id)
      .update({
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
        expectPayDate,
        pictureGallery,
        
      })
      .then(() => {
        this.props.history.push("/purchaseorders");
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
    console.log(this.state.receivedEmailDate);
  };

  render() {
    const {
      deviceModel,
      deviceQty,
      devicePrice,
      deviceComments,
      deviceCarrier,
    } = this.state;

    return (
      <div>
        <div className="top-form">
          <div className="bottom-form-widget">
            <div className="widget-title">
              <h3 className="widget-title-text">Customer Info</h3>
            </div>

            <div className="customer-info">
              <TextField
                required
                label="Company"
                InputProps={{ name: "company" }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.company}
                variant="outlined"
                style={{ width: 250 }}
              />
              <TextField
                required
                label="Vendor Name"
                InputProps={{ name: "vendorName" }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.vendorName}
                variant="outlined"
                style={{ width: 250 }}
              />
            </div>
            <div className="customer-info">
              <TextField
                required
                label="E-Mail"
                InputProps={{ name: "email" }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.email}
                variant="outlined"
                style={{ width: 250 }}
              />
              <TextField
                required
                label="Phone Number"
                InputProps={{ name: "phoneNumber" }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.phoneNumber}
                variant="outlined"
                style={{ width: 250 }}
              />
            </div>
          </div>

          <div className="bottom-form-widget">
            <div className="widget-title">
              <h3 className="widget-title-text">Status</h3>
            </div>

            <div className="customer-info">
              <TextField
                required
                label="PO Number"
                InputProps={{ name: "poNumber" }}
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.poNumber}
                variant="outlined"
                style={{ width: 250 }}
              />
              <TextField
                select
                label="Status"
                InputProps={{ name: "status" }}
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
                {statusList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="customer-info">
              <TextField
                id="poDate"
                label="Date"
                type="date"
                className={classes.textField}
                InputProps={{
                  name: "poDate",
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
                  name: "expectPayDate",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.expectPayDate}
                variant="outlined"
                onChange={this.onChange}
              />
            </div>
            <div className="customer-info">
              <TextField
                select
                label="Payment Type"
                InputProps={{ name: "typePayment" }}
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
                {payment.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>

        <div className="newOrder_container_po">
          <form
            onSubmit={this.onSubmit.bind(this)}
            className={classes.container}
            noValidate
          >
            <TableContainer style={classes.topForm}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell align="right">Carrier</TableCell>
                    <TableCell align="right">MODEL</TableCell>
                    <TableCell align="right">IMEI</TableCell>
                    <TableCell align="right">MEMORY</TableCell>
                    <TableCell align="right">COMMENTS</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                 
                  </TableRow>
                </TableHead>

                <TableBody>
                  <BuyBackForm
                    onChange={this.onDeviceChange}
                    deviceList={this.state.deviceList}
                    buybackResults={this.state.buybackResults}
                    deleteItem={this.deleteItem}
                    getPrice={this.getPrice}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <div></div>

            <Button
              style={{ margin: 25, cursor: "pointer" }}
              variant="contained"
              onClick={this.addNewDeviceRow}
              color="primary"
            >
              {" "}
              <AddCircleIcon className="button__icon" />
              Add Item
            </Button>

            <Typography style={{ color: "gray", fontSize: 30 }}>
              Total: ${this.getTotal()}
            </Typography>

            <Button
              style={classes.backButton}
              variant="contained"
              color="secondary"
              component={Link}
              to="/purchaseorders/"
            >
              {" "}
              <BackspaceIcon className="button__icon" />
              Back
            </Button>
            <Button
              style={classes.saveButton}
              type="submit"
              variant="contained"
              className={classes.submit}
              onClick={this.onSubmit}
              color="primary"
            >
              {" "}
              <SaveIcon className="button__icon" />
              Save
            </Button>
          </form>
        </div>
        <div className="bottom-form">
          <div className="bottom-form-widget">
            <ImageUploader
              imageUrl={this.state.url}
              handleUrlChange={this.handleUrlChange}
            />
            <div className="modal__content">
              <Button onClick={this.handleOpen}>See All Pictures</Button>
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
            </div>
            <div></div>
            {this.state.url != null ? (
              <div>
                <img
                  src={this.state.url}
                  alt="Uploaded Images"
                  height="200"
                  width="200"
                  style={{ marginTop: 15, marginLeft: 5 }}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="bottom-form-widget">
            <div className="button__email__div">
              <button
                className="button__email"
                onClick={this.receivedOrderEmail}
              >
                <LocalShippingIcon className="button__icon" /> Recived Order
              </button>
              <button className="button__email" onClick={this.getPrice}>
                <LocalShippingIcon className="button__icon" /> Get Price
              </button>
              <p>{this.state.receivedEmailDate}</p>
            </div>
            <div className="button__email__div">
              <button className="button__email" onClick={this.orderProcess}>
                <ComputerIcon className="button__icon" /> Order Process
              </button>
              <p>{this.state.processOrderDate}</p>
            </div>
            <div className="button__email__div">
              <button className="button__email" onClick={this.paymentEmail}>
                <MonetizationOnIcon className="button__icon" /> Payment Sent
              </button>
              <p>{this.state.paymentEmailDate}</p>
            </div>
            <div className="button__email__div">
              <button className="button__email" onClick={this.deviceInfo}>
                <GetAppIcon className="button__icon" /> Get Info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditOrder);
