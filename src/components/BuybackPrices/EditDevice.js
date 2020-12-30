import React, { Component } from "react"
import firebase from '../firebase/Firebase';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Create from '../Vendors/Create'
import {
  withRouter
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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

const carriers = [
    {
      value: "AT-T",
      label: "AT&T",
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

  const deviceMemory = [
      {
          value: "16GB", 
          label: "16GB"
      },
      {
        value: "32GB", 
        label: "32GB"
    },
    {
        value: "64GB", 
        label: "64GB"
    },
    {
        value: "128GB", 
        label: "128GB"
    }, 
    {
        value: "256GB", 
        label: "256GB"
    }, 
    {
        value: "512GB", 
        label: "512GB"
    }, 
    {
        value: "1TB", 
        label: "1TB"
    }
  ]

class EditDevice extends Component {


  constructor(props) {

    super(props);

    this.ref = firebase.firestore().collection('unlockedBbList');

    this.state = {
      open: false, 
      model: '', 
      carrier: '', 
      memory: '', 
      buybackMs: '', 
      deviceId: '', 
      retailPrice: '', 
    };

  }

  componentDidMount() {
    try {
        const ref = firebase
        .firestore()
        .collection('unlockedBbList')
        .doc(this.props.match.params.id)
        
        ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Loading");
                const deviceInfo = doc.data()
                console.log(deviceInfo)
            } else {
                console.log('Phone does not exist')
            }
        })
    }catch(e) {
        console.log('Error getting info', e)
    } 
 }

  onChange = (e) => {

    const state = this.state

    state[e.target.name] = e.target.value;

    this.setState(state);

  }


  onSubmit = (e) => {
    
    e.preventDefault();


    const id = parseInt(this.state.deviceId, 10) 
    const {

     model, 
     carrier, 
     memory, 
     buybackMs, 
     deviceId, 
     retailPrice

    } = this.state;


    this.ref.add({

        model, 
        carrier, 
        memory, 
        buybackMs, 
        id,
        retailPrice
    }).then((docRef) => {

      this.setState({

        model: '', 
        carrier: '', 
        memory: '', 
        buybackMs: '', 
        buybackMs: '', 
        deviceId: id, 
        retailPrice: '', 

      });

      this.props.history.push("/buybackiPhones")

    })

      .catch((error) => {

        console.error("Error adding document: ", error);

      });

  }


  render() {
    const { classes } = this.props;
    const {
      
     model, 
     carrier, 
     memory, 
     buybackMs, 
     deviceId, 
     retailPrice

    } = this.state;


    return (

      <Container component="main" maxWidth="xs">
        <NavBar />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalShippingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Device
      </Typography>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  label="ID"
                  InputProps={{ name: 'deviceId' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={deviceId}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>

                <TextField
                  required
                  label="Device Model"
                  InputProps={{ name: 'model' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={model}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                select
                label="Carrier"
                InputProps={{ name: "carrier" }}
                className={classes.textField}
                value={this.state.carrier}
                onChange={this.onChange}
                style={{ width: 500 }}
                SelectProps={{
                  MenuProps: {
                    
                  },
                }}
                helperText="Please select "
                margin="normal"
                variant="outlined"
              >
                {carriers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> 
              </Grid>
              <Grid item xs={12}>
              <TextField
                select
                label="Memory"
                InputProps={{ name: "memory" }}
                className={classes.textField}
                value={this.state.memory}
                onChange={this.onChange}
                style={{ width: 500 }}
                SelectProps={{
                  MenuProps: {
                    
                  },
                }}
                helperText="Please select "
                margin="normal"
                variant="outlined"
              >
                {deviceMemory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> 
                
              </Grid>
              <Grid item xs={12}>

              <TextField
                  required
                  label="MobileSource BuyBack"
                  InputProps={{ name: 'buybackMs' }}
                  className={classes.textField}
                  onChange={this.onChange}
                  value={buybackMs}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>

<TextField
    required
    label="Retail Price"
    InputProps={{ name: 'retailPrice' }}
    className={classes.textField}
    onChange={this.onChange}
    value={retailPrice}
    variant="outlined"
    fullWidth
  />
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
            </Grid>
          </form>
        </div>

      </Container>

    );
  }
}






export default withStyles(styles)(withRouter(EditDevice));