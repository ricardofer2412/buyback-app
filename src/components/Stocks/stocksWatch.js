import React from "react";
import axios from "axios";
import "./stocks.css";
import Divider from "@material-ui/core/Divider";

class StocksWatch extends React.Component {
  constructor() {
    super();
    this.state = {
      appleStockPrice: "",
      appleOpenPrice: "",
    };
  }

  getStocks = () => {
    console.log("get stocks");

    const appleStockUlr =
      "https://finnhub.io/api/v1/quote?symbol=SPY&token=budf5mn48v6ped90n62g";

    axios.get(appleStockUlr).then((response) => {
      const responseData = response.data;
      const AppleCurrentPrice = responseData.c;
      const AppleOpenPrice = responseData.o;
      this.setState({
        appleStockPrice: AppleCurrentPrice,
        appleOpenPrice: AppleOpenPrice,
      });

      console.log(responseData);
    });
    this.getPercentChange();
  };

  getPercentChange() {
    // (40-30)/30 * 100 = 33%
    const openPrice = this.state.appleOpenPrice;
    console.log(openPrice);
    // const current = parseInt.this.state.AppleCurrentPrice;

    // const percentChange = ((open - current) / current) * 100;
    // console.log(percentChange);
  }

  render() {
    return (
      <div>
        <div className="stocksDiv">
          <div className="stocksBox">
            <div className="title-box">
              <h4 className="titleText">Apple</h4>
              <h4 className="price">${this.state.appleStockPrice}</h4>
            </div>
            <div className="percentChangeBox">
              <h3 className="percentChange">30%</h3>
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="divider" />
          <div className="stocksBox">
            <div className="title-box">
              <h4 className="titleText">Apple</h4>
              <h4 className="price">{this.state.appleStockPrice}</h4>
            </div>
            <div className="percentChangeBox">
              <h3 className="percentChange">30%</h3>
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="divider" />

          <div className="stocksBox">
            <div className="title-box">
              <h4 className="titleText">Apple</h4>
              <h4 className="price">{this.state.appleStockPrice}</h4>
            </div>
            <div className="percentChangeBox">
              <h3 className="percentChange">30%</h3>
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="divider" />

          <div className="stocksBox">
            <div className="title-box">
              <h4 className="titleText">Apple</h4>
              <h4 className="price">{this.state.appleStockPrice}</h4>
            </div>
            <div className="percentChangeBox">
              <h3 className="percentChange">30%</h3>
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="divider" />

          <div className="stocksBox">
            <div className="title-box">
              <h4 className="titleText">Apple</h4>
              <h4 className="price">{this.state.appleStockPrice}</h4>
            </div>
            <div className="percentChangeBox">
              <h3 className="percentChange">30%</h3>
            </div>
          </div>
        </div>

        <button onClick={this.getStocks}>get stocks</button>
        <button onClick={this.getPercentChange}>Get perdect</button>
      </div>
    );
  }
}

export default StocksWatch;
