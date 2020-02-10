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
import TrackingList from "./components/tracking/tracking-list";
import NewTracking from './components/tracking/new-tracking'
import NavBar from './components/NavBar/NavBar'
import EditTracking from './components/tracking/edit-tracking'

ReactDOM.render(
  <Router>
    <div>
      <NavBar />
      <div className="container">

      </div>
      <Route exact path="/" component={App} />
      <Route exact path="/vendors" component={CustomerList} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/show/:id" component={Show} />
      <Route exact path="/purchaseorders" component={PurchaseOrders} />
      <Route exact path="/neworder" component={NewOrder} />
      <Route exact path="/tracking" component={TrackingList} />
      <Route exact path='/new-tracking' component={NewTracking} />
      <Route exact path='/edit-tracking' component={EditTracking} />

    </div>
  </Router>,
  document.getElementById("root")
);
