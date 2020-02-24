
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






const styles = theme => ({
  depositContext: {
    flex: 2,

  },
    
  ShoppingCart: {
    color: 'red', 
    justify: 'center', 
    fontSize: 30,
    margin: theme.spacing(1),


  },

  Title: {
   
  }

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
        <Grid item xs={12}>
        <CardActionArea>
                   <ShoppingCart className={classes.ShoppingCart}/>
                 <CardContent>
                <Typography variant="h5" component="h2">
                    Purchase Orders
                </Typography>
              <Typography component="p">
               52
             </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
            size="small" 
         component={Link} to={'/neworder/'}
         >
        Create New PO
        </Button>
       
      </CardActions>
                
        </Grid>  
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withRouter(VendorCount));