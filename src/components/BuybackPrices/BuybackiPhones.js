import React from "react";
import "./bb.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import firebase from "../firebase/Firebase";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { apiEndpoint } from "../../config.js";
import axios from "axios";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import BuildIcon from "@material-ui/icons/Build";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import SamsungBuyBack from "./SamsungPrices/SamsungBuyback";
import { ContactSupportOutlined } from "@material-ui/icons";
import { NativeSelect, Tab } from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import QuickQuote from "../QuickQuote/QuickQuote";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SendIcon from '@material-ui/icons/Send';

class BuybackiPhone extends React.Component {
  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
    this.ref = firebase
      .firestore()
      .collection("unlockedBbList")
      .orderBy("createDate");
    this.state = {
      samsungPriceList: [],
      unlockedBbList: [],
      averageBB: 0,
      loading: false,
      lastBuyBackUpdate: "",
      loadingIdx: false,
      profit: 0,
      value: 'iphone'
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  setLoading = () => {
    this.setState({ loading: true });
  };
  getRetailPrices() {
    alert(
      "Whoops, I dont do anything yet, but I will get retail prices in the future."
    );
  }

  getPercentProfit(buying, selling) {
    const profit = 0;
    const buyingPrice = buying;
    const sellingPrice = selling;
    const sellingProfit = sellingPrice - buyingPrice;
    const grossProfit = (sellingProfit / sellingPrice) * 100;

    const totalProfit = grossProfit;

    this.setState({
      profit: totalProfit.toFixed(2),
    });
  }

  async getPrice(e, carrier, model, phoneMemory, i) {

    this.setState({ loading: true });
    this.setState({ loadingIdx: i });

    // this.getPercentProfit(30, 40);
    // e.preventDefault()

    //GEt iPhone Prices 
    const { value } = e.target;
    if (this.state.value === "iphone") {
      console.log('iPhone Check')
    const unlockedBbList = JSON.parse(
      JSON.stringify(this.state.unlockedBbList)
    );

    const lastTimeUpdate = new Date().toLocaleString();
    const device = unlockedBbList[i];
    const deviceId = unlockedBbList[i].unlockedBbList;

    let phoneModel = model;

    let phoneCarrier = carrier;

    const newUrl = apiEndpoint + "/price";
    const body = {
      phone: `${phoneModel}-${phoneCarrier}?capacity=${phoneMemory}`,
    };
    firebase
      .firestore()
      .collection("unlockedBbList")
      .doc(deviceId)
      .update({
        buybackMs: device.newUpdateBuyBack,
      });
    try {
      const response = await axios.post(newUrl, body);
      const { data } = response;
      const buybackResults = data.filter((data) => data.condition === "good");
      let pricesList = buybackResults.map((data) => data.price);
      console.log("Price BB", pricesList)
      try {
        const averagePriceList = [];

        for (let i = 0; i < pricesList.length -1; i++) {
          let price = pricesList[i].replace("$", "");
          var bbPrice = parseFloat(price);
          averagePriceList.push(bbPrice);
        }
        let total = 0;
        for (let i = 0; i < averagePriceList.length; i++) {
          total += averagePriceList[i];
        }
        let bbAvg = total / averagePriceList.length;
        this.setState({
          averageBB: bbAvg.toFixed(2),
        });
      } catch (e) {}

      let mobileSourceBb = buybackResults[0].price;

      mobileSourceBb = mobileSourceBb.replace("$", "");
      mobileSourceBb = Number(mobileSourceBb);

      let bbAvg = parseFloat(this.state.averageBB);
      let newDevice = { ...device, buybackResults, bbAvg };
      const newDeviceList = [...this.state.unlockedBbList];

      newDeviceList.splice(i, 1, newDevice);
      this.setState({ unlockedBbList: newDeviceList, loadingIdx: false });
      this.getPercentProfit(bbAvg, device.retailPrice);

      firebase
        .firestore()
        .collection("unlockedBbList")
        .doc(deviceId)
        .update({
          buybackResults: buybackResults,
          lastBuyBackUpdate: lastTimeUpdate,
          newUpdateBuyBack: mobileSourceBb,
          carrier: newDevice.carrier,
          profit: this.state.profit,
          bbAvg: this.state.averageBB,

          // profit: profit
        })
        .catch((error) => {
          console.error("Error adding customer: ", error);
        });
    } catch (e) {
      console.log("ERrror getting price: ", e);
    }
  }else{
   

    console.log('Samsung Check')

    // e.preventDefault()
    const samsungPriceList = JSON.parse(
      JSON.stringify(this.state.samsungPriceList)
    );
    console.log('samsung prices', samsungPriceList)
    const lastTimeUpdate = new Date().toLocaleString();
    const device = samsungPriceList[i];
    const deviceId = samsungPriceList[i].samsungPriceList;
    console.log(device)
    let phoneModel = model;

    let phoneCarrier = carrier;

    const newUrl = apiEndpoint + "/price";
    const body = {
      phone: `${phoneModel}-${phoneCarrier}?capacity=${phoneMemory}`,
    };

    // firebase
    //   .firestore()
    //   .collection("samsungPrices")
    //   .doc(deviceId)
    //   .update({
    //     samsungPriceList: device.newUpdateBuyBack,
    //   });
    try {
      const response = await axios.post(newUrl, body);
      const { data } = response;
      console.log(data)
      const buybackResults = data.filter((data) => data.condition === "good");
      let pricesList = buybackResults.map((data) => data.price);
      try {
        const averagePriceList = [];

        for (let i = 0; i < pricesList.length; i++) {
          let price = pricesList[i].replace("$", "");
          var bbPrice = parseFloat(price);
          averagePriceList.push(bbPrice);
        }
        let total = 0;
        for (let i = 0; i < averagePriceList.length; i++) {
          total += averagePriceList[i];
        }
        let bbAvg = total / averagePriceList.length;
        this.setState({
          averageBB: bbAvg.toFixed(2),
        });
      } catch (e) {}

      let mobileSourceBb = buybackResults[0].price;

      mobileSourceBb = mobileSourceBb.replace("$", "");
      mobileSourceBb = Number(mobileSourceBb);

      let bbAvg = parseFloat(this.state.averageBB);
      let newDevice = { ...device, buybackResults, bbAvg };
      const newDeviceList = [...this.state.unlockedBbList];

      newDeviceList.splice(i, 1, newDevice);
      this.setState({ unlockedBbList: newDeviceList, loadingIdx: false });
      this.getPercentProfit(bbAvg, device.retailPrice);

      firebase
        .firestore()
        .collection("samsungPrices")
        .doc(deviceId)
        .update({
          buybackResults: buybackResults,
          lastBuyBackUpdate: lastTimeUpdate,
          newUpdateBuyBack: mobileSourceBb,
          carrier: newDevice.carrier,
          profit: this.state.profit,
          bbAvg: this.state.averageBB,

          // profit: profit
        })
        .catch((error) => {
          console.error("Error adding customer: ", error);
        });
    } catch (e) {
      console.log("ERrror getting price: ", e);
    }
  }
  }

  onCollectionUpdate = (querySnapshot) => {
    const unlockedBbList = [];
    querySnapshot.forEach((doc) => {
      const {
        uid,
        id,
        model,
        carrier,
        memory,
        buybackMs,
        retailPrice,
        bbAvg,
        buybackResults,
        lastBuyBackUpdate,
        newUpdateBuyBack,
        profit,
      } = doc.data();

      unlockedBbList.push({
        unlockedBbList: doc.id,
        id,
        model,
        carrier,
        memory,
        buybackMs,
        retailPrice,
        bbAvg,
        uid,
        buybackResults,
        lastBuyBackUpdate,
        newUpdateBuyBack,
        profit,
      });
    });

    unlockedBbList.reverse();

    this.setState({
      unlockedBbList,
    });
  };

  handleOnChangeType = (e) => {
    const { value } = e.target;
    if (value === "iphone") {
      // LOAD IPHONE
      this.unsubscribe();
      this.ref = firebase
        .firestore()
        .collection("unlockedBbList")
        .orderBy("id");
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      this.setState({
        value: 'iphone'
      })
    }
    if (value === "samsung") {
      this.unsubscribe();
      this.ref = firebase
        .firestore()
        .collection("samsungPrices")
        .orderBy("id");
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.ref
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data);
            this.setState({ samsungPriceList: data, 
            value:'samsung' });
          });
      
  

    
      console.log(this.state.samsungPriceList)
      // LOAD SAUSMUNG
    }

    if (value === "ipad") {
      // LOAD IPAD
    }
  };

  handleCarrierChange = (e, i) => {
    const { value } = e.target;
    const copy = this.state.unlockedBbList.slice(0);
    const newItem = { ...copy[i], carrier: value };
    copy.splice(i, 1, newItem);
    this.setState({
      unlockedBbList: copy,
    });
  };
  render() {
    return (
      <div className="main">
        <div
          style={{
    
            marginBottom: "-75px",
            marginLeft: "75px",
          }}
        >
          <Tooltip title="Add Model">
            <Fab component={Link} to="/buybackiPhones/new" aria-label="Add" style={{backgroundColor:'#2196f3'}}>
              <AddIcon  />
            </Fab>
          </Tooltip>
          <NativeSelect
            style={{ marginLeft: 20 }}
            onChange={this.handleOnChangeType}
          >
            <option value="iphone">iPhone</option>
            <option value="samsung">Samsung</option>
            <option value="ipad">iPad</option>
          </NativeSelect>
        </div>
        <div className="paper">
          <TableContainer>
            <Table stickyHeader>
              <TableHead style={{ background: "red" }}>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Model</TableCell>
                  <TableCell align="left">Carrier</TableCell>
                  <TableCell align="left">Memory</TableCell>
                  <TableCell align="left">Retail Price</TableCell>
                  <TableCell align="left">MobileSource BB Old</TableCell>
                  <TableCell align="left">MobileSource BB New</TableCell>
                  {/* <TableCell align="left">Profit Average</TableCell> */}
                  <TableCell align="left">BuyBack Avg</TableCell>
                  {/* <TableCell align="left">Trend</TableCell> */}
                  <TableCell align="left">Others</TableCell>
                  <TableCell align="left">Last Update</TableCell>
                  <TableCell align="left">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.unlockedBbList.map((item, i) => (
                  <TableRow key={`${i} - 1`}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>
                      <NativeSelect
                        onChange={(e) => this.handleCarrierChange(e, i)}
                        value={item.carrier}
                      >
                        <option value="Unlocked">Unlocked</option>
                        <option value="Sprint">Sprint</option>
                        <option value="AT-T">AT&T</option>
                        <option value="T-Mobile">T-Mobile</option>
                      </NativeSelect>
                    </TableCell>
                    <TableCell>{item.memory}</TableCell>
                    <TableCell>${item.retailPrice}</TableCell>
                    <TableCell>${item.buybackMs}</TableCell>
                    <TableCell>${item.newUpdateBuyBack}</TableCell>
                    {/* <TableCell>{item.profit}%</TableCell> */}
                    <TableCell>${item.bbAvg}</TableCell>
                    {/* <TableCell>
                      {item.newUpdateBuyBack > item.buybackMs ? (
                        <TrendingUpIcon style={{ color: "green" }} />
                      ) : (
                        <TrendingDownIcon style={{ color: "red" }} />
                      )}
                    </TableCell> */}

                    <TableCell key={i}>
                      {this.state.loadingIdx !== false &&
                      this.state.loadingIdx === i ? (
                        <CircularProgress />
                      ) : (
                        <React.Fragment>
                          {item.buybackResults != null ? (
                            <div>
                              {item.buybackResults.map((bb) => (
                                <p>
                                  {bb.vendor}: {bb.price}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <div> - - </div>
                          )}
                        </React.Fragment>
                      )}
                    </TableCell>
                    <TableCell>{item.lastBuyBackUpdate}</TableCell>

                    <TableCell className='actionCell'>
                      <Tooltip title="Get BuyBack Prices">
                        <IconButton
                          onClick={(e) =>
                            this.getPrice(
                              e,
                              item.carrier,
                              item.model,
                              item.memory,
                              i
                            )
                          }
                          style={{ backgroundColor: "white" }}
                        >
                          <MonetizationOnIcon
                            variant="contained"
                            disabled={i === 0}
                            style={{ color: "#ff1744", cursor: "pointer" }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Device">
                        <IconButton
                          component={Link}
                          to={`/buybackiPhones/edit/${item.unlockedBbList}`}
                          style={{ backgroundColor: "white" }}
                        >
                          <EditIcon
                            variant="contained"
                            disabled={i === 0}
                            style={{
                              color: "#ff1744",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                     
                          <QuickQuote phoneData={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default BuybackiPhone;
