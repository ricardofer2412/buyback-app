import React from 'react'
import firebase from "../firebase/Firebase.js";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import {
    withRouter
} from 'react-router-dom'; 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: { 
        marginLeft: theme.spacing(1), 
        marginRight: theme.spacing(1),
        width: 200,
    }, 
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
}))

const uuid = require("uuid");

export class CreateOrder extends React.Component { 
    constructor(props){
        super(props);

        this.ref = firebase.firestore().collection("purchase_orders"); 
        this.state = {
            deductionAmount: "",
            deviceTotal: "",
            poDate: "",
            poNumber: "",
            poTotal: "",
            quantity: "",
            
        };
    }
        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        };

        onSubmit = e => {
          e.preventDefault();

          const { deductionAmount, deviceTotal, poDate, poNumber, poTotatl, quantity } = this.state;
          const purchase_orderId = uuid();

          console.log("purchase_orderId", purchase_orderId); 
          this.ref
            .doc(purchase_orderId)
            .set({
                purchase_orderId , 
                deductionAmount, 
                deviceTotal, 
                poDate,
                poNumber,
                poTotatl,
                quantity
            })
            ,then(() => {
                this.setState({
                    deductionAmount, 
                    deviceTotal, 
                    poDate, 
                    poNumber,
                    poTotatl,
                    quantity
                });
                this.props.histotry.push('/purchaseorders');
            })
                .catch(error => {
                    console.error("Error adding document:", error)
             
            });

            };

            render() {
                const { deductionAmount, deviceTotal, poDate, poNumber, poTotatl, quantity } = this.state;
            return (
        
            ) 
    }
}