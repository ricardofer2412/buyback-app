
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ShoppingCart } from '@material-ui/icons'
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