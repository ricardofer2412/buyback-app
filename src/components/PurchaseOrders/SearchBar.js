import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import firebase from "../firebase/Firebase.js";

const classes = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function SearchPo({ poNumber }) {
  function searchPo(poNumber) {
    console.log("Searching for PO");
    const ref = firebase
      .firestore()
      .collection("purchaseOrders")
      .doc("15879");

    ref.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
      }
    });
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Search For PO" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon onClick={searchPo} />
      </IconButton>
    </Paper>
  );
}

export default SearchPo;
