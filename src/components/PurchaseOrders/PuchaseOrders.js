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
import "./po.css";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import SearchPo from "./SearchBar";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";

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
    backgroundColor: "#2196f3",
    color: "white",
  },
});
class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("purchaseOrders");
    this.unsubscribe = null;
    this.state = {
      purchaseOrders: [],
      poNumber: "15879",
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const purchaseOrders = [];
    querySnapshot.forEach((doc) => {
      const {
        poNumber,
        company,
        vendorName,
        status,
        expectPayDate,
      } = doc.data();
      purchaseOrders.push({
        purchaseOrderId: doc.id,
        doc,
        poNumber,
        company,
        vendorName,
        status,
        expectPayDate,
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

  searchPo(poNumber) {
    console.log("Searching for PO");
    firebase
      .firestore()
      .collection("purchaseOrders")
      .doc(poNumber)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
        }
      });
  }

  searchResults() {}

  render() {
    const { classes } = this.props;
    return (
      <div className="main">
        <div>
          <Tooltip title="Create New Order">
            <Fab
              component={Link}
              to="/neworder"
              aria-label="Add"
              className={classes.fab}
            >
              <AddIcon className={classes.extendedIcon} />
            </Fab>
          </Tooltip>
        </div>

        <div className="paper-div">
          <Table className="table-div">
            <TableHead>
              <TableRow className="table-tr">
                <TableCell className="table-td">PO# </TableCell>
                <TableCell className="table-td">Vendor </TableCell>

                <TableCell className="table-td">Status</TableCell>
                <TableCell className="table-td">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
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
                      style={{ backgroundColor: "#FFD600", color: "black" }}
                    >
                      {purchaseOrder.status}
                    </TableCell>
                  ) : purchaseOrder.status === "Tested" ? (
                    <TableCell
                      style={{ backgroundColor: "#E65100", color: "white" }}
                    >
                      {purchaseOrder.status}
                    </TableCell>
                  ) : purchaseOrder.status === "Entered" ? (
                    <TableCell
                      style={{ backgroundColor: "#F50057", color: "white" }}
                    >
                      {purchaseOrder.status}
                    </TableCell>
                  ) : purchaseOrder.status === "Complete" ? (
                    <TableCell
                      style={{ backgroundColor: "#2E7D32", color: "white" }}
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
                    <Tooltip title="Delete">
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
                        <DeleteIcon
                          className="delete-button"
                          fontSize="small"
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        className="edit-button"
                        component={Link}
                        to={`/purchaseorder/edit/${purchaseOrder.purchaseOrderId}`}
                      >
                        <Create />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton
                        className="edit-button"
                        component={Link}
                        to={`/purchaseorder/view/${purchaseOrder.purchaseOrderId}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(PurchaseOrders));
