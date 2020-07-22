import React from 'react'
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
} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Create } from '@material-ui/icons'
import NavBar from '../NavBar/NavBar'
import { withStyles } from '@material-ui/core/styles';
import {
    withRouter
} from 'react-router-dom';




const styles = theme => ({
    root: {
        display: 'flex',
    },
    fab: {
        margin: 10,
        margisnTop: -10,
        padding: 5,
        weight: 40,
        color: 'white',
        background: '#76C63A'

    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: 'center',
        justify: 'center'
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),

    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',

    },



});
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
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <NavBar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
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
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(PurchaseOrders));