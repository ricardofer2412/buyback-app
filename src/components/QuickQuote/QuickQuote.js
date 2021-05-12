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
import ReceiptIcon from '@material-ui/icons/Receipt';
import LinearProgress from '@material-ui/core/LinearProgress';



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
      loading: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setLoading = () => {
    this.setState({ loading: true})
  }

  async sendQuote() {
   
    this.setLoading()
    const { phoneModel, customerPhoneNumber, customerEmail, customerQuote, customerName} = this.state;

    const emailQuickQuote = await axios.post(apiEndpoint, {
        path:'/api/emailQuickQuote',
        method: 'post', 
        body: {
            customerEmail, 
            customerName, 
            customerPhoneNumber, 
            customerQuote, 
            phoneModel
            
        }
    })
    console.log('Email Quick Quote')


    this.handleClose();
    alert("Email Was Sent!");
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
    } = this.state;

    return (
      <div>
        <ReceiptIcon
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            color: "#ff1744",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
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
                  margin="dense"
              id="name"
              label="Name"
              InputProps={{ name: "customerName" }}
              onChange={this.onChange}
              value={customerName}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="name"
              label="PhoneNumber"
              InputProps={{ name: "customerPhoneNumber" }}
              onChange={this.onChange}
              value={customerPhoneNumber}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              InputProps={{ name: "customerEmail" }}
              onChange={this.onChange}
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
          <div> 

          {this.state.loading === false ? (
               <div> </div>

          ) : (<LinearProgress />)
          }
            </div> 

       
        </Dialog>
      </div>
    );
  }
}