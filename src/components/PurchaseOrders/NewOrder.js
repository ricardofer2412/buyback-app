import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import Button from '@material-ui/core/Button';
import {
    withRouter
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField"
import { Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"

const uuid = require("uuid");

const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 6,
        textAlign: 'left',
        display: "flex",
        flexDirection: 'column',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginBottom: 20
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

class NewOrder extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection("purchase_orders")
        this.state = {
            company: "",
            deviceTotal: "",
            poDate: "",
            poNumber: "",
            poTotal: "",
            quantity: "",
            email: "",
            address: "",
            expectDeliver: "",
            status: "",
            typePayment: ""


        };
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = e => {
        e.preventDefault();

        const {
            company,
            deviceTotal,
            poDate,
            poNumber,
            poTotal,
            quantity,
            email,
            address,
            expectDeliver,
            status,
            typePayment
        } = this.state;
        const purchase_orderId = uuid();

        console.log("purchase_orderId: ", purchase_orderId);
        this.ref
            .doc(purchase_orderId)
            .set({
                company,
                purchase_orderId,
                deviceTotal,
                poDate,
                poNumber,
                poTotal,
                quantity,
                email,
                address,
                expectDeliver,
                status,
                typePayment
            })
            .then(() => {
                this.setState({
                    company: "",
                    deviceTotal: "",
                    poDate: "",
                    poNumber: "",
                    poTotal: "",
                    quantity: "",
                    email: "",
                    address: "",
                    expectDeliver: "",
                    status: "",
                    typePayment: ""
                });
                this.props.histotry.push('/puchase_orders');
            })
            .catch(error => {
                console.error("Error adding document:", error)

            });

    };


    render() {

        const {
            company,

        } = this.state;
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                <Typography
                    component="h2" m variant="display4">
                    Purchase Order
                </Typography>
                <Paper className={classes.paper}>
                    <form onSubmit={this.onSubmit.bind(this)} className={classes.container} noValidate>
                        <div className={classes.inputContainer}>
                            <TextField
                                required
                                label="Company"
                                InputProps={{ name: 'company' }}
                                className={classes.textField}
                                onChange={this.onChange}
                                value={company}
                                variant="outlined"
                            />
                            <Divider variant="middle" />

                        </div>


                        <Divider />

                        <div>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>QTY</TableCell>
                                        <TableCell>Carrier</TableCell>
                                        <TableCell>Model</TableCell>
                                        <TableCell>IMEI</TableCell>
                                        <TableCell>Cost</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>

                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className={classes.inputContainer}>
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.button}
                                onClick={this.return}
                                color="primary">
                                Save
                        </Button>
                        </div>
                    </form>
                </Paper>



            </div>


        );
    }
}


export default withStyles(styles)(withRouter(NewOrder));

