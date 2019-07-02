import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import firebase from "../firebase/Firebase.js";
import { Container,
         Paper, 
         Table,
         TableBody,
         TableCell,
         TableHead, 
         TableRow, 
         Fab, 
         IconButton,
         makeStyles } from "@material-ui/core"
import Navbar from '../NavBar.js'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';





const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginLeft: theme.spacing(1),
    },
    
    container: {
      marginTop: 64,
    }
   ,
  }));
export class PurchaseOrders extends React.Component { 

    constructor(){
        super();
            this.ref = firebase.firestore().collection("purchase_orders");
            this.unsubscribe = null;
            this.state = { 
                purhase_orders: [],
                key: false
            }; 
    }

    onCollectionUpdate =  querrySnapshot => {
        const purchase_orders = [];
        querrySnapshot.forEach(doc => {
            const { deductionAmount,
            deviceTotal, 
        poData, 
        poNumber, 
        poTotal, 
        quantity 
        } = doc.data();
        purchase_orders.push({
            purchase_orderId: doc.id, 
            doc ,
            deductionAmount,
            deviceTotal, 
          poData, 
           poNumber, 
         poTotal, 
          quantity
        });
    }); 

    this.setState({
        purchase_orders
    });
};

componentDiMount() { 
    this.unsubscribe = this.ref.onSnapShot(this.onCollectionUpdate); 
}

delete = purchase_order => {
    const { purchase_orderId } = purchase_order; 
    console.log("key" , purchase_orderId, "purchase_order", purchase_order);
    firebase
        .firestore()
        .collection("purchase_order")
        .doc(purchase_orderId)
        .delete()
        .then(() => {
            console.log("PO Deleted");
            this.props.history.push("/purchaseorders");
        })
        .catch(error => {
            console.error("Error Deleting P0: ", error);
        });
        }


    render(){ 
        const classes = useStyles
        return(
           <Container style={{ marginTop: 68 }}> 
            <Fab
                  variant="extended"
                  component={ Link } to="/neworder"
                  color="secondary"
                  aria-label="Add" 
                  className={classes.fab}
                >
                  <AddIcon className={classes.extendedIcon} />
               </Fab>
            <Navbar />
            <Paper> 
                <Table> 
                    <TableHead>
                        <TableRow>
                            <TableCell>PO # </TableCell>
                            <TableCell>Date  </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.purhase_orders.map(purchase_order => (
                            <TableRow>
                                <TableCell>{purchase_order.poNumber}</TableCell>
                                <TableCell>{purchase_order.poDate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.delete(purchase_order)} aria-label="Delete" >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Paper>
           </Container>
        )
    }
}