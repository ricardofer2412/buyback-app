import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import Edit from "./components/Vendors/Edit";
import Create from "./components/Vendors/Create";
import Show from "./components//Vendors/Show";
import CustomerList from "./components/Vendors/CustomerList";
import PurchaseOrders from "./components/PurchaseOrders/PuchaseOrders";
import NewOrder from "./components/PurchaseOrders/NewOrder.js"
import DeviceList from "./components/Devices/DeviceList.js"


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/vendors" component={CustomerList} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/show/:id" component={Show} />
      <Route exact path="/purchaseorders" component={PurchaseOrders} />
      <Route exact path="/neworder" component={NewOrder} />
      <Route exact path="/devicelist" component={DeviceList} />
    </div>
  </Router>,
  document.getElementById("root")
);
