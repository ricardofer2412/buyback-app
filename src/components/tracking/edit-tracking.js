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
    width: 400,
  },
});

class EditTracking extends Component {

  constructor(props) {

    super(props);


    this.state = {
      key: '',

      trackingNum: '',

      vendorName: '',

      trackingStatus: ''

    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('trackings').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const tracking = doc.data();
        this.setState({
          key: doc.id,
          trackingNum: tracking.trackingNum,
          vendorName: tracking.vendorName,
          trackingStatus: tracking.trackingStatus

        });
      } else {
        console.log("Tracking Does Not Exist!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ tracking: state });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { trackingNum, vendorName, trackingStatus } = this.state;

    const updateRef = firebase.firestore().collection('trackings').doc(this.state.trackingId);
    updateRef.set({
      trackingNum, vendorName, trackingStatus
    }).then((docRef) => {
      this.setState({
        key: '',
        trackingNum: '',
        vendorName: '',
        trackingStatus: ''
      });
    })
      .catch((error) => {
        console.error("Error adding tracking: ", error);
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
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalShippingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Tracking Number
         </Typography>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Grid container spacing={6}>
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
export default withStyles(styles)(withRouter(EditTracking));

// <div class="container">

//   <div class="panel panel-default">

//     <div class="panel-heading">

//       <h3 class="panel-title">

//         ADD TRACKING

//     </h3>

//     </div>

//     <div class="panel-body">

//       <h4><Link to="/" class="btn btn-primary">Add tracking</Link></h4>

//       <form onSubmit={this.onSubmit}>

//         <div class="form-group">

//           <label for="title">Tracking:</label>

//           <input type="text" class="form-control" name="trackingNum" value={this.state.trackingNum} onChange={this.onChange} placeholder="Tracking" />

//         </div>

//         <div class="form-group">

//           <label for="author">Vendor:</label>

//           <input type="text" class="form-control" name="vendorName" value={this.state.vendorName} onChange={this.onChange} placeholder="Vendor" />

//         </div>



//         <button type="submit" class="btn btn-success">Submit</button>

//       </form>

//     </div>

//   </div>

// </div>

