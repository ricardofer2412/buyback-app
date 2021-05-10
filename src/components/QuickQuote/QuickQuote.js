import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class QuickQuote extends React.Component {
  constructor(props) {
    super(props);

    this.sendQuote = this.sendQuote.bind(this);

    this.state = {
      phoneModel: this.props.phoneData,
      open: false,
      customerName: "",
      customerEmail: "",
      customePhoneNumber: "",
      customerQuote: "",
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  sendQuote() {
    this.handleClose();
    console.log("New Price Sent");
  }

  saveQuote() {}

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
    } = this.state;
    console.log(this.state.phoneModel)
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Send Quote
        </Button>
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
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              InputProps={{ name: "customerName" }}
              onChange={this.onChange}
              value={customerName}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="PhoneNumber"
              InputProps={{ name: "customerPhoneNumber" }}
              onChange={this.onChange}
              value={customerPhoneNumber}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              InputProps={{ name: "customerEmail" }}
              onChange={this.onChange}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Quoted Price"
              InputProps={{ name: "customerQuote" }}
              onChange={this.onChange}
              value={customerQuote}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.sendQuote} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}