import React from "react";
import "../bb.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import firebase from '../../firebase/Firebase';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { apiEndpoint } from "../../../config.js";
import axios from "axios";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import BuildIcon from "@material-ui/icons/Build";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuickQuote from "../../QuickQuote/QuickQuote";

class SamsungBuyBack extends React.Component {
  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
    this.ref = firebase
      .firestore()
      .collection("samsungPrices")
      .orderBy("id");
    this.state = {
      samsungPriceList: [],
      averageBB: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  // setLoading = () => {
  //   this.setState({ loading: true });
  // };
  // getRetailPrices() {
  //   console.log("get retail prices");
  //   alert(
  //     "Whoops, I dont do anything yet, but I will get retail prices in the future."
  //   );
  // }

  // getPercentProfit(buying, selling) {
  //   const profit = 0;
  //   const buyingPrice = buying;
  //   const sellingPrice = selling;
  //   const sellingProfit = sellingPrice - buyingPrice;
  //   const grossProfit = (sellingProfit / sellingPrice) * 100;

  //   console.log("this is selling Profit", sellingProfit);
  //   console.log("this is grossProfit %", grossProfit);

  //   return profit;
  // }

  async getPrice(e, carrier, model, phoneMemory, i) {
    this.setState({ loading: true });

    // e.preventDefault()
    const samsungPriceList = JSON.parse(
      JSON.stringify(this.state.samsungPriceList)
    );
    const device = samsungPriceList[i];
    const deviceId = samsungPriceList[i].samsungPriceList;
    console.log(device.uid);
    let phoneModel = model;
    console.log("Model: ", model);
    let phoneCarrier = carrier;
    console.log(phoneCarrier);
    console.log(phoneMemory);
    const newUrl = apiEndpoint + "/price";
    const body = {
      // phone: `${phoneModel}-${phoneCarrier}?capacity=${phoneMemory}`,
      phone: `${phoneModel}?carrier=${phoneCarrier}&capacity=${phoneMemory}`,
    };

    try {
      const response = await axios.post(newUrl, body);
      const { data } = response;
      console.log('data' + data)
      const buybackResults = data.filter((data) => data.condition === "good");
      let pricesList = buybackResults.map((data) => data.price);

      try {
        const averagePriceList = [];

        for (let i = 0; i < pricesList.length; i++) {
          let price = pricesList[i].replace("$", "");
          var bbPrice = parseFloat(price);
          averagePriceList.push(bbPrice);
        }
        console.log(averagePriceList);
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
      let bbAvg = this.state.averageBB;
      let deviceNew = { ...device, bbAvg };
      let newDevice = { ...deviceNew, buybackResults };
      const newDeviceList = [...this.state.samsungPriceList];
      this.getPercentProfit(bbAvg, 1000);

      newDeviceList.splice(i, 1, newDevice);
      console.log(newDeviceList);
      this.setState({ samsungPriceList: newDeviceList });

      firebase
        .firestore()
        .collection("samsungPriceList")
        .doc(deviceId)
        .update({
          bbAvg,
          buybackMs: mobileSourceBb,
        })
        .catch((error) => {
          console.error("Error adding customer: ", error);
        });
    } catch (e) {
      console.log("ERrror getting price: ", e);
    }
  }
  onCollectionUpdate = (querySnapshot) => {
    const samsungPriceList = [];
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
      } = doc.data();

      samsungPriceList.push({
        samsungPriceList: doc.id,
        id,
        model,
        carrier,
        memory,
        buybackMs,
        retailPrice,
        bbAvg,
        uid,
      });
    });

    this.setState({
      samsungPriceList,
    });
  }

  render() {
    return (

      <div className="main">
        <div>Unlocked iPhone</div>

        <div
          style={{
            marginTop: "75px",
            marginBottom: "-75px",
            marginLeft: "75px",
          }}
        >
          {/* <Tooltip title="Add Model">
            <Fab component={Link} to="/buybackiPhones/new" aria-label="Add">
              <AddIcon />
            </Fab>
          </Tooltip> */}
        </div>
        <div className="paper">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Model</TableCell>
                  <TableCell align="left">Carrier</TableCell>
                  <TableCell align="left">Memory</TableCell>
                  <TableCell align="left">Retail Price</TableCell>
                  <TableCell align="left">MobileSource BB</TableCell>
                  <TableCell align="left"> Profit Average</TableCell>
                  <TableCell align="left">BuyBack Avg</TableCell>
                  <TableCell align="left">Others</TableCell>
                  <TableCell align="left">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.samsungPriceList.map((item, i) => (
                  <TableRow key={`${i} - 1`}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.carrier}</TableCell>
                    <TableCell>{item.memory}</TableCell>
                    <TableCell>${item.retailPrice}</TableCell>
                    <TableCell>{item.buybackMs}</TableCell>
                    <TableCell>%0</TableCell>
                    <TableCell>${item.bbAvg}</TableCell>

                    <TableCell key={i}>
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
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Get BuyBack Prices">
                        <IconButton style={{ backgroundColor: "white" }}>
                          <MonetizationOnIcon
                            onClick={(e) =>
                              this.getPrice(
                                e,
                                item.carrier,
                                item.model,
                                item.memory,
                                i
                              )
                            }
                            variant="contained"
                            disabled={i === 0}
                            style={{ color: "#ff1744", cursor: "pointer" }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Device">
                        <IconButton
                          component={Link}
                          to={`/buybackiPhones/edit/${item.samsungPriceList}`}
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

export default SamsungBuyBack;
