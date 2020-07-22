import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FlightIcon from '@material-ui/icons/Flight';
import firebase from "../firebase/Firebase.js";



const styles = theme => ({
  depositContext: {
    flex: 1,

  },

  FlightIcon: {
    color: 'red',
    justify: 'center',
    fontSize: 30,
    margin: theme.spacing(1),


  },
  titleText: {
    color: '#708096',
    fontSize: 18,
  },
  countText: {
    color: 'black',
    fontSize: 30,
    marginLeft: 10
  },
  iconStyle: {
    color: '#76C63A',
    float: 'right',
    marginTop: 15,
    marginRight: 15,
    fontSize: 40
  },
  countTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }

});

class VendorCount extends Component {
  constructor(props) {
    super(props);
    this.trackingRef = firebase.firestore().collection('trackings')
    this.state = {
      vendorCount: "1"
    }
  }
  componentDidMount = () => {
    this.trackingRef.get().then(querySnapshot => {
      this.trackingCount = querySnapshot.size
    }
    ).then((querySnapshot) => {
      this.setState({
        vendorCount: this.customerCount
      })

    })
  }
  render() {
    const { classes } = this.props;

    return (


      <Card>
        <FlightIcon className={classes.iconStyle} />
        <CardContent>
          <Typography className={classes.titleText} variant="h5" component="h2">
            Trackings
                </Typography>
        </CardContent>
        <CardContent className={classes.countTextView}>

          <Typography className={classes.countText} component="p">
            {this.trackingCount}
          </Typography>
        </CardContent>
      </Card>


    )
  }
}

export default withStyles(styles)(withRouter(VendorCount));