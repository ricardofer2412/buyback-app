import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import CustomerList from "./components/CustomerList";
import { PurchaseOrders } from "./components/PurchaseOrders/PuchaseOrders";
import { NewOrder } from "./components/PurchaseOrders/NewOrder.js"
 

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
    </div>
  </Router>,
  document.getElementById("root")
);
