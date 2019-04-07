import React, { Component } from 'react';
import "./index.css"
import Trades from "./Pages/Trades"
import Withdraws from "./Pages/Withdraws"
import ErrorPage from "./Pages/404"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import axios from 'axios'
import { connect } from "react-redux";

class App extends Component {

  componentDidMount(){
    const apiLinks = ["https://blockchaintech-code-test.herokuapp.com/withdraws.json","https://blockchaintech-code-test.herokuapp.com/trades.json"];

    for (const link in apiLinks) {
      axios.get(apiLinks[link])
      .then(res =>{

        // ------ // Applying key to the data
        for (let key = 0; key < res.data.trades.length; key++) {
          res.data.trades[key] = {...res.data.trades[key],key:key}
        }
        link == 0 ? this.props.Withdraws_Data(res) :this.props.Trades_Data(res);
      })
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch> 
          <Route exact path="/trades" component={Trades} />
          <Route path="/withdraws" component={Withdraws} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Trades_Data: (data) => {dispatch({type:'UPDATE_TRADE',data:data})},
    Withdraws_Data: (data) => { dispatch({ type: 'UPDATE_WITHDRAWS', data: data }) }
  }
}

export default connect(null, mapDispatchToProps)(App);