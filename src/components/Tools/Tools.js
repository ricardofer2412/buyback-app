import React from "react";
import "./tools.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { apiEndpoint } from "../../config.js";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";

const carrier = [
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
];

const deviceBrand = [
  {
    value: "Android",
    label: "Android",
  },
  {
    value: "Apple",
    label: "Apple",
  },
];
class Tools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imei: "",
      imeiEsn: "",
      deviceInfo: [],
      deviceStatus: "",
      imeiStatus: "",
      deviceCarrier: "",
      devicetype: "",
    };
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ purchaseOrder: state });
  };

  getiCloud = async (e) => {
    e.preventDefault();
    console.log("test for iCloud");
    // body: `Invoiceno=15964`,
    // const poNumber = this.state.poNumber;
    const IMEI = this.state.imei;
    const deviceInfo = this.state.deviceInfo;
    const deviceStatus = this.state.deviceStatus;
    const carrier = this.state.deviceCarrier;
    try {
      const getInfo = await axios.post(`${apiEndpoint}/phonecheck/`, {
        type: "CheckiCloud",
        body: `imei=${IMEI}`,
      });
      const { data } = getInfo;
      const deviceStatus = data.iCloudStatus;
      this.setState({
        deviceInfo: data,
        deviceStatus: deviceStatus,
      });
    } catch (e) {
      console.log("ERROR getting info: ", e);
    }
    console.log(deviceInfo);
  };
  getEsnStatus = async (e) => {
    e.preventDefault();
    console.log("test for ESN");
    // body: `Invoiceno=15964`,
    // const poNumber = this.state.poNumber;
    const imeiEsn = this.state.imeiEsn;
    const deviceInfo = this.state.deviceInfo;
    const carrier = this.state.deviceCarrier;
    const devicetype = this.state.devicetype;
    try {
      const getInfo = await axios.post(`${apiEndpoint}/phonecheck/`, {
        type: "CheckEsn",
        body: `imei=${imeiEsn}carrier=${carrier}`,
      });
      const { data } = getInfo;
      this.setState({
        deviceInfo: data,
      });
    } catch (e) {
      console.log("ERROR getting info: ", e);
    }
    console.log(deviceInfo);
  };

  render() {
    const { deviceCarrier, devicetype } = this.state;
    return (
      <div className="tools">
        <div className="tools__container">
          <div>
            <h2> Check for iCloud </h2>
          </div>
          <div>
            <TextField
              required
              label="Enter IMEI"
              InputProps={{ name: "imei" }}
              onChange={this.onChange}
              value={this.state.imei}
              variant="outlined"
              style={{ width: 250 }}
            ></TextField>
          </div>

          <div className="tools__submit">
            <Button
              type="submit"
              variant="contained"
              onClick={this.getiCloud}
              color="primary"
            >
              Check
            </Button>
          </div>
          <div>
            ICLOUD STATUS:
            {this.state.deviceStatus === "OFF" ? (
              <h4 style={{ color: "green" }}>{this.state.deviceStatus}</h4>
            ) : (
              <h4 style={{ color: "red" }}>{this.state.deviceStatus}</h4>
            )}
          </div>
        </div>

        <div className="tools__container">
          <div>
            <h2> Check IMEI </h2>
          </div>
          <div>
            <TextField
              required
              label="Enter IMEI"
              InputProps={{ name: "imeiEsn" }}
              onChange={this.onChange}
              value={this.state.imeiEsn}
              variant="outlined"
              style={{ width: 250 }}
            ></TextField>
          </div>

          <div>
            <TextField
              style={{ width: 250 }}
              select
              label="Carrier"
              InputProps={{ name: "deviceCarrier" }}
              value={deviceCarrier}
              onChange={this.onChange}
              SelectProps={{
                MenuProps: {},
              }}
              margin="normal"
              variant="outlined"
            >
              {carrier.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              style={{ width: 250 }}
              select
              label="Device Type"
              InputProps={{ name: "devicetype" }}
              value={devicetype}
              defaultValue={devicetype}
              onChange={this.onChange}
              SelectProps={{
                MenuProps: {},
              }}
              margin="normal"
              variant="outlined"
            >
              {deviceBrand.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              onClick={this.getEsnStatus}
              color="primary"
            >
              Check
            </Button>
          </div>
          <div>STATUS:</div>
        </div>
      </div>
    );
  }
}

export default Tools;
