import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { apiEndpoint } from "../../config";
import ReceiptIcon from "@material-ui/icons/Receipt";
import LinearProgress from "@material-ui/core/LinearProgress";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SendIcon from '@material-ui/icons/Send';
import { IconButton, Tooltip } from "@material-ui/core";

export default class QuickQuote extends React.Component {
  constructor(props) {
    super(props);

    this.sendQuote = this.sendQuote.bind(this);

    this.state = {
      phoneModel: this.props.phoneData,
      open: false,
      customerName: "",
      customerEmail: "",
      customerPhoneNumber: "",
      customerQuote: "",
      customerCustomNote: "",
      loading: false,
      contactType: "",
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ contactType: event.target.value });
  };

  setLoading = () => {
    this.setState({ loading: true });
  };

  async sendQuote() {
    this.setLoading();
    console.log("This is text", this.state.contactType);
    const {
      phoneModel,
      customerPhoneNumber,
      customerEmail,
      customerQuote,
      customerName,
      customerCustomNote,
    } = this.state;

    if (this.state.contactType === "Email") {
      const emailQuickQuote = await axios.post(apiEndpoint, {
        path: "/api/emailQuickQuote",
        method: "post",
        body: {
          customerEmail,
          customerName,
          customerPhoneNumber,
          customerQuote,
          phoneModel,
          customerCustomNote,
        },
      });
      console.log("Email Quick Quote");

      this.handleClose();
      alert("Email Was Sent!");
    } else {
      this.handleClose();
      alert("Currently Working on this feature");
    }
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const {
      customerPhoneNumber,
      customerName,
      customerEmail,
      customerQuote,
      customerCustomNote,
    } = this.state;

    return (
      <div>
        <Tooltip title="Send Quote">
        <IconButton>
          <SendIcon
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            color: "#ff1744",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
        </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">QUICK QUOTE FORM</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.phoneModel.carrier} {this.state.phoneModel.model}{" "}
              {this.state.phoneModel.memory}
            </DialogContentText>
            <TextField
              required
              id="name"
              label="Name"
              InputProps={{ name: "customerName" }}
              onChange={this.onChange}
              value={customerName}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: "15px" }}
            />
            <TextField
              required
              id="name"
              label="PhoneNumber"
              InputProps={{ name: "customerPhoneNumber" }}
              onChange={this.onChange}
              value={customerPhoneNumber}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: "15px" }}
            />
            <TextField
              autoFocus
              id="name"
              label="Email"
              InputProps={{ name: "customerEmail" }}
              onChange={this.onChange}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: "15px" }}
            />
            <TextField
              autoFocus
              id="name"
              label="Quoted Price"
              InputProps={{ name: "customerQuote" }}
              onChange={this.onChange}
              value={customerQuote}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: "15px" }}
            />
            <TextField
              autoFocus
              id="name"
              rowsMax={4}
              label="Notes  "
              InputProps={{ name: "customerCustomNote" }}
              onChange={this.onChange}
              value={customerCustomNote}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: "15px" }}
            />
          </DialogContent>
          <DialogContent>
            <RadioGroup
              value={this.state.contactType}
              onChange={this.handleChange}
            >
              <FormControlLabel
                onChange={this.handleChange}
                value="Email"
                control={<Radio />}
                label="E-Mail"
                checked={this.state.contactType === "Email"}
              />
              <FormControlLabel
                onChange={this.handleChange}
                value="Text"
                control={<Radio />}
                label="Text"
                checked={this.state.contactType === "Text"}
              />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.sendQuote} color="primary">
              Send
            </Button>
          </DialogActions>
          <div>
            {this.state.loading === false ? <div> </div> : <LinearProgress />}
          </div>
        </Dialog>
      </div>
    );
  }
}
