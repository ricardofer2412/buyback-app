
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { People, ShoppingCart, StayCurrentPortrait } from '@material-ui/icons'
import firebase from "../firebase/Firebase.js";





const styles = theme => ({
  depositContext: {
    flex: 2,

  },
  ShoppingCart: {
    color: '#F23535',
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
    marginLeft: 10,

  },
  iconStyle: {
    color: '#F23535',
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
    this.poCountRef = firebase.firestore().collection('purchaseOrders')
    this.state = {
      vendorCount: "1"
    }
  }

  componentDidMount = () => {
    this.poCountRef.get().then(querySnapshot => {
      this.poCount = querySnapshot.size
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
        <ShoppingCart className={classes.iconStyle} />
        <CardContent>
          <Typography className={classes.titleText} variant="h5" component="h2">
            Purchase Orders
                </Typography>
        </CardContent>
        <CardContent className={classes.countTextView}>
          <Typography className={classes.countText} component="p">
            {this.poCount}
          </Typography>
        </CardContent>
      </Card>

    )
  }
}

export default withStyles(styles)(withRouter(VendorCount));