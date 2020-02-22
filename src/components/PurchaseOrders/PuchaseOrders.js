import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import firebase from "../firebase/Firebase.js";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Fab,
    IconButton,
    makeStyles
} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Create, Visibility } from '@material-ui/icons'




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
class PurchaseOrders extends React.Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection("purchaseOrders")
        this.unsubscribe = null;
        this.state = {
            purchaseOrders: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const purchaseOrders = [];
        querySnapshot.forEach(doc => {
            const {
                poNumber,
                company,
                vendorName,
                status
            } = doc.data();
            purchaseOrders.push({
                purchaseOrderId: doc.id,
                doc,
                poNumber,
                company,
                vendorName,
                status
            });
        });

        this.setState({
            purchaseOrders
        });
    };

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    delete = purchaseOrder => {
        const { purchaseOrderId } = purchaseOrder;
        console.log("key: ", purchaseOrderId, "purchaseOrder", purchaseOrder);
        firebase
            .firestore()
            .collection("purchaseOrders")
            .doc(purchaseOrderId)
            .delete()
            .then(() => {
                console.log("Order Deleted");
                this.props.history.push("/purchaseorders");
            })
            .catch(error => {
                console.error("Error Deleting P0: ", error);
            });
    }


    render() {
        const classes = useStyles
        return (
            <Container style={{ marginTop: 68 }}>
                <Fab
                    variant="extended"
                    component={Link} to="/neworder"
                    color="secondary"
                    aria-label="Add"
                    className={classes.fab}
                >
                    <AddIcon className={classes.extendedIcon} />
                </Fab>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>PO# </TableCell>
                                <TableCell>Vendor  </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.purchaseOrders.map(purchaseOrder => (
                                <TableRow>

                                    <TableCell>{purchaseOrder.poNumber}</TableCell>
                                    <TableCell>{purchaseOrder.vendorName}</TableCell>
                                    <TableCell>{purchaseOrder.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => this.delete(purchaseOrder)} aria-label="Delete" >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            component={Link} to={`/purchaseorder/edit/${purchaseOrder.purchaseOrderId}`}
                                        >
                                            <Create />
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

export default PurchaseOrders;