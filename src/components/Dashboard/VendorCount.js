import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';





const styles = theme => ({
  depositContext: {
    flex: 1,
  },
});

class VendorCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendorCount: "1"
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AccountCircleIcon />
        <Title>Vendors</Title>
        <Typography component="p" variant="h4">
          {this.state.vendorCount}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          Find Vendor
      </Typography>

        <div>

        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withRouter(VendorCount));