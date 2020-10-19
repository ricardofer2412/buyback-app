import React from "react";
import { Link } from "react-router-dom";
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Create } from "@material-ui/icons";
import NavBar from "../NavBar/NavBar";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    textAlign: "center",
    justify: "center",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  fab: {
    marginBottom: 15,
  },
});
class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("purchaseOrders");
    this.unsubscribe = null;
    this.state = {
      purchaseOrders: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const purchaseOrders = [];
    querySnapshot.forEach((doc) => {
      const { poNumber, company, vendorName, status } = doc.data();
      purchaseOrders.push({
        purchaseOrderId: doc.id,
        doc,
        poNumber,
        company,
        vendorName,
        status,
      });
    });

    this.setState({
      purchaseOrders,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete = (purchaseOrder) => {
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
      .catch((error) => {
        console.error("Error Deleting P0: ", error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container>
            <Container className={classes.container}>
              <Fab
                component={Link}
                to="/neworder"
                color="secondary"
                aria-label="Add"
                className={classes.fab}
              >
                <AddIcon className={classes.extendedIcon} />
              </Fab>
            </Container>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PO# </TableCell>
                    <TableCell>Vendor </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.purchaseOrders.map((purchaseOrder) => (
                    <TableRow>
                      <TableCell>{purchaseOrder.poNumber}</TableCell>
                      <TableCell>{purchaseOrder.vendorName}</TableCell>

                      {purchaseOrder.status === "Paid" ? (
                        <TableCell
                          style={{ backgroundColor: "#e91e63", color: "white" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      ) : purchaseOrder.status === "Received" ? (
                        <TableCell
                          style={{ backgroundColor: "#ffeb3b", color: "black" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      ) : purchaseOrder.status === "Tested" ? (
                        <TableCell
                          style={{ backgroundColor: "#ff9800", color: "white" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      ) : purchaseOrder.status === "Entered" ? (
                        <TableCell
                          style={{ backgroundColor: "#f44336", color: "white" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      ) : purchaseOrder.status === "Complete" ? (
                        <TableCell
                          style={{ backgroundColor: "#4caf50", color: "white" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{ backgroundColor: "white", color: "gray" }}
                        >
                          {purchaseOrder.status}
                        </TableCell>
                      )}
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this PO"
                              )
                            ) {
                              this.delete(purchaseOrder);
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          component={Link}
                          to={`/purchaseorder/edit/${purchaseOrder.purchaseOrderId}`}
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
    );
  }
}

export default withStyles(styles)(withRouter(PurchaseOrders));
