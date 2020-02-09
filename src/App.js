import React from "react";
import ButtonAppBar from './components/NavBar/NavBar'
import { DialogContent } from "@material-ui/core";


class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <ButtonAppBar />
        </div>

        <h1>  MobileSource BB </h1>
      </div>
    )
  };
}

export default App;
