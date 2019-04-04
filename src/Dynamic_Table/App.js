import React, { Component } from 'react';
import "./index.css"
import Trades from "./Pages/Trades"
import Withdraws from "./Pages/Withdraws"
import errorPage from "./Pages/404"

import { BrowserRouter, Route, Switch, Link} from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {

  // componentDidMount(){

  //   selection();
  // }

  selection = () =>{
    return "Yes"
  };

  render() {
    return (
      <BrowserRouter>
        <Switch> 
          <Route exact path="/trades" component={Trades} />
          <Route path="/withdraws" component={Withdraws} />
          <Route path="/" component={errorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;