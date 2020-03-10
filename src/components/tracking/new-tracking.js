import React, { Component } from "react"
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Create from '../Vendors/Create'
import {
  withRouter
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';

import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NavBar from '../NavBar/NavBar'


const uuid = require("uuid");
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menu: {
    width: 200,
  },
});

class NewTracking extends Component {


  constructor() {

    super();

    this.ref = firebase.firestore().collection('trackings');
    this.customerRef = firebase.firestore().collection('customers');

    this.state = {

      trackingNum: '',

      vendorName: '',

      trackingStatus: '',

      poNumber: '',

      customers: [],

      currentCustomer: false,

      open: false

    };

  }


  openDialog() {
    this.setState({ open: true });
  };
  closeDialog() {
    this.setState({ open: false });
  }

  componentDidMount() {
    this.unsubscribe = this.customerRef.onSnapshot(this.onCollectionUpdate);

  }
  onCollectionUpdate = querySnapshot => {
    const customers = [];
    querySnapshot.forEach(doc => {
      const { poNumber, firstName, lastName, phoneNumber, vendorName } = doc.data();
      customers.push({
        customerId: doc.id,
        doc,
        firstName,
        lastName,
        phoneNumber,
        vendorName,
        poNumber
      });
    });

    this.setState({
      customers,
      currentCustomer: customers[0].vendorName
    });
  };
  onChange = (e) => {

    const state = this.state

    state[e.target.name] = e.target.value;

    this.setState(state);

  }


  onSubmit = (e) => {

    e.preventDefault();

    const trackingId = uuid();

    const customer = this.state.customers.find(item => item.vendorName === this.state.currentCustomer);

    const { customerId } = customer;

    const {

      trackingNum,
      vendorName,
      trackingStatus,
      poNumber

    } = this.state;


    this.ref.add({

      trackingNum,
      vendorName,
      trackingStatus,
      trackingId,
      customerId,
      poNumber
    }).then((docRef) => {

      this.setState({


        trackingNum: '',
        vendorName: '',
        trackingStatus: '',
        poNumber: '',

      });

      this.props.history.push("/tracking")

    })

      .catch((error) => {

        console.error("Error adding document: ", error);

      });

  }

  handleCustomerChange = ({ target }) => {
    const { value } = target;
    this.setState({
      currentCustomer: value
    });
  }


  render() {
    const { classes } = this.props;
    const {
      trackingNum,
      vendorName,
      trackingStatus,
      poNumber } = this.state;


    return (

      <Container component="main" maxWidth="xs">
        <NavBar />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalShippingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Tracking
      </Typography>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  label="Tracking Number"
                  InputProps={{ name: 'trackingNum' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={trackingNum}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="PO Number"
                  InputProps={{ name: 'poNumber' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={poNumber}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={this.openDialog.bind(this)}>New Vendor</Button>
                <Dialog open={this.state.open} onClose={this.state.open} onEnter={console.log("Hey.")}>
                  <Create />
                  <Button onClick={this.closeDialog.bind(this)} color="primary">
                    Cancel
            </Button>
                </Dialog>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Vendor"
                  value={this.state.currentCustomer}
                  className={classes.textField}
                  onChange={this.handleCustomerChange}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select "
                  margin="normal"
                  variant="outlined"
                >
                  {this.state.customers.map(customer => (
                    <MenuItem value={customer.vendorName}>{customer.vendorName}
                      {customer.label}
                    </MenuItem>
                  ))}
                </TextField>


              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.return}

            >
              Add New
             </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/tracking-list" variant="body2">
                  Cancel
            </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>

    );
  }
}


//       <div class="container">

//         <div class="panel panel-default">

//           <div class="panel-heading">

//             <h3 class="panel-title">

//               Add Tracking

//             </h3>

//           </div>

//           <div class="panel-body">

//             <h4><Link to="/" class="btn btn-primary">Add tracking</Link></h4>

//             <form onSubmit={this.onSubmit}>

//               <div class="form-group">

//                 <label for="title">Tracking:</label>

//                 <input type="text" class="form-control" name="trackingNum" value={trackingNum} onChange={this.onChange} placeholder="Tracking" />

//               </div>
//               <div>

//               </div>

//               <label for="title">Select Vendor:</label>
//               <div>
//                 <Button onClick={this.openDialog.bind(this)}>Add New Vendor</Button>
//                 <Dialog open={this.state.open} onClose={this.state.open} onEnter={console.log("Hey.")}>
//                   <Create />
//                   <Button onClick={this.closeDialog.bind(this)} color="primary">
//                     Cancel
//             </Button>
//                 </Dialog>
//               </div>
//               <div>
//                 <select onChange={this.handleCustomerChange} value={this.state.currentCustomer}>
//                   {this.state.customers.map(customer => (
//                     <option value={customer.vendorName}>{customer.vendorName}</option>
//                   ))}
//                 </select>
//               </div>
//               {/* <div class="form-group">

//                 <label for="author">Vendor:</label>

//                 <input type="text" class="form-control" name="vendorName" value={vendorName} onChange={this.onChange} placeholder="Vendor" />

//               </div> */}

//               {/* <div class="form-group">

//                 <label for="author">Status:</label>

//                 <input type="text" class="form-control" name="trackingStatus" value={trackingStatus} onChange={this.onChange} placeholder="Status" />

//               </div> */}

//               <button type="submit" class="btn btn-success">Submit</button>

//             </form>

//           </div>

//         </div>

//       </div>

//     );

//   }

// }



export default withStyles(styles)(withRouter(NewTracking));