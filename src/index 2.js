import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import CustomerList from "./components/CustomerList";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/Vendors" component={CustomerList} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/show/:id" component={Show} />
    </div>
  </Router>,
  document.getElementById("root")
);
