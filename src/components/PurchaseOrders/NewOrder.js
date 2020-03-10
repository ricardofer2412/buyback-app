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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container'




const uuid = require("uuid");
const carriers = [
    {
        value: "AT&T",
        label: "AT&T",
        color: 'red'
    },
    {
        value: "T-Mobile",
        label: "T-Mobile"
    },
    {
        value: "Sprint",
        label: "Sprint"
    },
    {
        value: "Verizon",
        label: "Verizon"
    },
    {
        value: "Unlocked",
        label: "Unlocked"
    }
]
const payment = [
    {
        value: 'Cash',
        label: 'Cash'
    },
    {
        value: 'Check',
        label: 'Check'
    },
    {
        value: 'Paypal',
        label: 'Paypal'
    }
]
const statusList = [
    {
        value: 'Pending',
        label: 'Pending'
    },
    {
        value: 'Completed',
        label: 'Completed'
    },
    {
        value: 'Tested',
        label: 'Tested'
    },
    {
        value: 'Paid',
        label: 'Paid'
    },
    {
        value: 'Entered',
        label: 'Entered'
    }
]



const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20

    },
    container: {
        maxWidth: 'lg'
    },
    Typography: {
        fontFamily: '"Product Sans", serif',
    },


    // paper: {
    //     padding: theme.spacing.unit * 2,
    //     marginLeft: theme.spacing.unit * 3,
    //     marginRight: theme.spacing.unit * 3,
    //     marginTop: theme.spacing.unit * 6,
    //     textAlign: 'left',
    //     display: "flex",
    //     flexDirection: 'column',
    //     color: theme.palette.text.secondary,
    // },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 5,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        textAlign: 'center',
        justify: 'center'
    },
    textField: {
        marginLeft: 5,
        marginTop: 10,
        width: 150
    },
    textFieldDevice: {
        marginLeft: 5,
        marginTop: 10,
        width: 150
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',

    },
    menu: {
        width: 150
    },
});

class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.deviceRef = firebase.firestore().collection('devices')
        this.ref = firebase.firestore().collection("purchaseOrders")
        this.state = {
            company: "",
            deviceTotal: 0.00,
            poDate: new Date(),
            poNumber: "",
            poTotal: "",
            quantity: 1,
            email: "",
            address: "",
            expectDeliver: "",
            status: "",
            typePayment: '',
            phoneNumber: "",
            devices: []


        };
    }



    handleDateChange = date => {
        this.setState({ poDate: date });
    };

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const purchaseOrderId = uuid();
        const deviceId = uuid();
        const {
            company, vendor, poNumber, emai, phoneNumber, status, typePayment, poDate, quantity
        } = this.state
        const { devices } = this.state;
        this.ref
            .doc(purchaseOrderId)
            .set({
                company, vendor, poNumber, emai, phoneNumber, status, typePayment, poDate, quantity, devices
            }).then((docRef) => {
                this.setState({
                    company: "",
                    deviceTotal: "",
                    poDate: '',
                    poNumber: "",
                    poTotal: "",
                    quantity: '',
                    email: "",
                    address: "",
                    expectDeliver: "",
                    status: "",
                    typePayment: '',
                    phoneNumber: "",
                    devices: []

                });


                this.props.history.push("/purchaseorders")
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            });


    };


    render() {

        const {
            company, vendorName, poNumber, email, phoneNumber, status, typePayment, poDate,
            quantity, devices

        } = this.state;
        const { classes } = this.props;

        const deviceTotal = this.state.price * quantity;
        return (
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Typography
                        className={classes.Typography}
                        component="h2" m variant="display4">
                        Purchase Order: {poNumber}
                    </Typography>
                    <Paper className={classes.paper}>

                        <form onSubmit={this.onSubmit.bind(this)} noValidate>
                            <Grid container spacing={2}>
                                <Grid item sm>
                                    <TextField
                                        required
                                        label="Company"
                                        InputProps={{ name: 'company' }}
                                        className={classes.textField}
                                        onChange={this.onChange}
                                        value={company}
                                        variant="outlined"
                                        style={{ width: 250 }}
                                    />
                                </Grid>
                                <Grid item sm >
                                    <TextField
                                        required
                                        label="Vendor Name"
                                        InputProps={{ name: 'vendorName' }}
                                        className={classes.textField}
                                        onChange={this.onChange}
                                        value={vendorName}
                                        variant="outlined"
                                        style={{ width: 250 }}

                                    />
                                </Grid>
                                <Grid item sm>
                                    <TextField
                                        required
                                        label='PO Number'
                                        InputProps={{ name: 'poNumber' }}
                                        className={classes.textField}
                                        onChange={this.onChange}
                                        value={poNumber}
                                        variant="outlined"
                                        style={{ width: 250 }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item sm>
                                    <TextField
                                        required
                                        label="E-Mail"
                                        InputProps={{ name: 'email' }}
                                        className={classes.textField}
                                        onChange={this.onChange}
                                        value={email}
                                        variant="outlined"
                                        style={{ width: 250 }}

                                    />
                                </Grid>
                                <Grid item sm>
                                    <TextField
                                        required
                                        label="Phone Number"
                                        InputProps={{ name: 'phoneNumber' }}
                                        className={classes.textField}
                                        onChange={this.onChange}
                                        value={phoneNumber}
                                        variant="outlined"
                                        style={{ width: 250 }}

                                    />
                                </Grid>
                                <Grid item sm>
                                    <TextField
                                        style={{ width: 250 }}
                                        select
                                        label="Referred By"
                                        InputProps={{ name: 'status' }}
                                        className={classes.textField}
                                        value={status}
                                        defaultValue={poDate}
                                        onChange={this.onChange}

                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {statusList.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>

                                <Grid item sm>
                                    <TextField
                                        style={{ width: 250 }}
                                        id="poDate"
                                        label="Date"
                                        type="date"
                                        className={classes.textField}
                                        InputProps={{
                                            name: 'poDate'
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={poDate}
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Grid>

                                <Grid item sm>

                                </Grid>
                                <Grid item sm>
                                    <TextField
                                        select
                                        label="Payment Type"
                                        InputProps={{ name: 'typePayment' }}
                                        className={classes.textField}
                                        value={typePayment}
                                        onChange={this.onChange}
                                        style={{ width: 250 }}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {payment.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container spacing={2}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>QTY</TableCell>
                                            <TableCell>Carrier</TableCell>
                                            <TableCell>Model</TableCell>
                                            <TableCell>IMEI</TableCell>
                                            <TableCell>Cost</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell>
                                                <TextField
                                                    InputProps={{ name: 'quantity' }}
                                                    className={classes.textFieldDevice}
                                                    onChange={this.onChange}
                                                    value={quantity}
                                                    variant="outlined"
                                                    width="25%"

                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    select
                                                    label="Carrier"
                                                    InputProps={{ name: 'carrier' }}
                                                    className={classes.textFieldDevice}
                                                    value={this.state.carrier}
                                                    onChange={this.onChange}

                                                    SelectProps={{
                                                        MenuProps: {
                                                            className: classes.menu,
                                                        },
                                                    }}
                                                    margin="normal"
                                                    variant="outlined"
                                                >
                                                    {carriers.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    InputProps={{ name: 'model' }}
                                                    className={classes.textFieldDevice}
                                                    onChange={this.onChange}
                                                    value={this.state.model}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    InputProps={{ name: 'imei' }}
                                                    className={classes.textFieldDevice}
                                                    onChange={this.onChange}
                                                    value={this.state.imei}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    InputProps={{ name: 'price' }}
                                                    className={classes.textFieldDevice}
                                                    onChange={this.onChange}
                                                    value={this.state.price}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>

                                                <Typography variant="h6" gutterBottom
                                                >
                                                    ${deviceTotal}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    className="btn btn-link"
                                                    type="button"
                                                    onClick={this.addDevice}
                                                >
                                                    +
                                               </button>
                                            </TableCell>
                                        </TableRow>



                                    </TableBody>
                                </Table>
                            </Grid>


                            <div className={classes.inputContainer}>
                                <Button
                                    style={{ margin: 25 }}
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={this.return}
                                    color="primary">
                                    Save
                        </Button>
                            </div>

                        </form>
                    </Paper>
                </Container>
            </div>

        );
    }
}


export default withStyles(styles)(withRouter(NewOrder));

