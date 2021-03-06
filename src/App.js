import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Edit from "./components/Vendors/Edit";
import Create from "./components/Vendors/Create";
import Show from "./components//Vendors/Show";
import CustomerList from "./components/Vendors/CustomerList";
import PurchaseOrders from "./components/PurchaseOrders/PuchaseOrders";
import NewOrder from "./components/PurchaseOrders/NewOrder.js";
import TrackingList from "./components/tracking/tracking-list";
import NewTracking from "./components/tracking/new-tracking";
import NavBar from "./components/NavBar/NavBar";
import EditTracking from "./components/tracking/edit-tracking";
import EditOrder from "./components/PurchaseOrders/EditOrder";
import OrderView from "./components/PurchaseOrders/OrderView";
import UnlockediPhones from "./components/CellphonePrices/UnlockediPhones";
import Tools from "./components/Tools/Tools";
import Login from "./components/Login/index";
import firebase from "./components/firebase/Firebase";
import BuybackiPhones from "./components/BuybackPrices/BuybackiPhones";
import CreateDevice from "./components/BuybackPrices/CreateDevice";
import EditDevice from "./components/BuybackPrices/EditDevice";
import StocksWatch from "./components/Stocks/stocksWatch";
import SamsungBuyBack from "./components/BuybackPrices/SamsungPrices/SamsungBuyback";
import CreateSamsung from './components/BuybackPrices/SamsungPrices/CreateDevice';
import VendorList from "./components/PurchaseOrders/VendorList/VendorList";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.user === null || !this.state.user.uid ? (
          <Router>
            <Route path="/" render={() => <NavBar user={this.state.user} />} />
            <Route path="/" component={Login} />
          </Router>
        ) : (
          <Router>
            <Route
              path="/"
              render={() => (
                <NavBar userId={this.state.user.uid} user={this.state.user} />
              )}
            />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/vendors" component={CustomerList} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/vendors/new" component={Create} />
            <Route exact path="/show/:id" component={Show} />
            <Route exact path="/purchaseorders" component={PurchaseOrders} />
            <Route exact path="/neworder" component={NewOrder} />
            <Route exact path="/tracking" component={TrackingList} />
            <Route exact path="/tracking/new/" component={NewTracking} />
            <Route exact path="/tracking/edit/:id" component={EditTracking} />
            <Route exact path="/purchaseorder/edit/:id" component={EditOrder} />
            <Route exact path="/purchaseorder/view/:id" component={OrderView} />
            <Route exact path="/UnlockediPhones/" component={UnlockediPhones} />
            <Route exact path="/Tools/" component={Tools} />
            <Route exact path="/BuybackiPhones/" component={BuybackiPhones} />
            <Route exact path="/buybackiPhones/new" component={CreateDevice} />
            <Route exact path="/samsungprices" component={SamsungBuyBack} />
            <Route exact path='/samsungprices/new' component={CreateSamsung} />
            <Route exact path='/vendorlist' component={VendorList}/>
            <Route
              exact
              path="/buybackiPhones/edit/:id"
              component={EditDevice}
            />
            <Route exact path="/Stocks" component={StocksWatch} />
          </Router>
        )}
      </div>
    );
  }
}
export default App;
