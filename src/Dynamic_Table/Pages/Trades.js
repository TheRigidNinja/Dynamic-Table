import React, { Component } from 'react';
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import Filter from './Filter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import FilterIcon from '@material-ui/icons/FilterListRounded'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconNext from '@material-ui/icons/ChevronRight';
import IconProv from '@material-ui/icons/ChevronLeft';
import IconDropdown from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button'

class Trades extends Component {
  state = {
    anchorFilt: null,
    anchorDrop: null,
    pageMenu: false,
    setStateProps: false,
    filterElement: null,
    rowNumber: 5,
    filteredTableData: [],
    tableData:[],
    didReceiveProps:false
  }

  componentDidMount(){
    this.windowLoad();
  }

  componentDidUpdate(){
    document.addEventListener("load",this.windowLoad());
  }

  windowLoad =()=>{
    // console.log(this.props.tableData)
    if(this.state.didReceiveProps == false && this.props.tableData != undefined){
      this.setState({
        didReceiveProps: true,
        tableData: this.props.tableData.trades
      },()=>{this.handleFiltersEvents();})
    }
  }

  // ------ // Pops up filter options when clicked
  handleClick = (event) => {
    if(event.currentTarget.parentElement.className === "filter"){
      this.setState({anchorFilt:event.currentTarget });
    }else{
      this.setState({ anchorDrop: event.currentTarget});
    }
  };
  
  handleClose = (info) => {
    // ------ // Removes pop-up filter options
    this.setState({anchorFilt:null, anchorDrop: null});
    // ------ // Passes data to function
    this.handleFiltersEvents(info);    
  };

  handleReset = () =>{
    this.setState({rowNumber:5,filterElement: null});
    document.querySelector(".searchBar").querySelector("input").value="";
    this.handleFiltersEvents("Reset");
  }

  // ------ //
  handlePagination = (type) =>{
    
    console.log(this.state.tableData)
  }

  handleFiltersEvents=(info)=>{
    let rageUpdatedAt = false,
    rangeKey = null,
    searchValue = null,
    uuid = false,
    volume = false,
    price = false,
    filter = false,
    filterElement = info=="Reset"?null:this.state.filterElement,
    filterRows = info=="Reset"?5:this.state.rowNumber;

    // ------// Types of actions to take for different Filters
    switch(true){
      case ["ASK","BID","BTC/AUD","ETH/AUD","ETH/BTC"].includes(info):
        filterElement = info;
        this.setState({filterElement: info});
      break;

      case /[0-9]/.test(Number(info)):
        filterRows = info;
        console.log("----",info)
        this.setState({rowNumber: info});
      break;

      case info === "Search":
        // ------// Whenever a user starts searching the below executes
        searchValue = document.querySelector(".searchBar")
        .querySelector("input").value.replace(/\s/g, '').toLowerCase();
        // ------// Makes sure you have a range between something
        switch(true){
          case searchValue.indexOf("-")>=0 && /[a-zA-Z]/.test(searchValue) !=true:
            rangeKey="-"
          break;
          case searchValue.indexOf("to")>=0:
            rangeKey="to"
          break;
          case searchValue.indexOf("&")>=0:
            rangeKey="&"
          break;
          case searchValue.indexOf("and")>=0:
            rangeKey="and"
          break;
        }
        // ------// Sets the value of range in array
        if(rangeKey !== null){
          rangeKey = searchValue.split(rangeKey);
          let holdValue = Math.max(Number(rangeKey[0]),Number(rangeKey[1]))
          rangeKey[0] = Math.min(Number(rangeKey[0]),Number(rangeKey[1]))
          rangeKey[1] = holdValue;
        }
      break;
      default:
        console.log("FAILED")
    }

    // ------// Rules for filters
    let rowCount = 0;
    if(this.state.tableData !== undefined){
      const filteredArray = this.state.tableData.filter(filt => {
        // ------// Side & TradingPair  - Filter
        if(filt["side"] == filterElement){
          filter = true;
        }else if(filt["tradingPair"]["symbol"] == filterElement){
          filter = true;
        }else if(filterElement == null){
          filter = true;
        }else{
          filter = false;
        }
        // ------// rangeKey = null which means a users was never typing it; then do below
        if(rangeKey == null){
          uuid = filt["uuid"].toLowerCase().indexOf(searchValue)>=0;
          volume = filt["volume"].indexOf(searchValue)>=0;
          price = filt["price"].indexOf(searchValue)>=0;
        // ------// Calculating range
        }else if(filt["updatedAt"] >= rangeKey[0] && filt["updatedAt"] <= rangeKey[1]){
          rageUpdatedAt = true;
        }else{ rageUpdatedAt = false; }

        // ------// restricts how many rows can be shown
        let perimeterCheck = false;
        if(rowCount < filterRows && filter){perimeterCheck = true;rowCount++;}

        return(perimeterCheck && (info!="Search" || rageUpdatedAt || uuid || volume || price))
      })

      this.setState({filteredTableData:filteredArray})
    }
  }


  render() {
    const {pageMenu,filterElement,anchorFilt,anchorDrop,rowNumber,filteredTableData} = this.state;
    return(
      <div className="TableContainer">
        <NavLink to="/withdraws"><Button variant="contained" size="large" color="primary" className="navBTN_next">Withdraws<i className="material-icons">navigate_next</i></Button></NavLink>  

        <Paper className="paper">
          <Button variant="outlined" size="large" color="primary" className="clear" onClick={this.handleReset}>Reset</Button>     

          {/* // ------ // Filter icon*/}
          <section className="filter" >
            <Fab variant="extended" aria-owns={anchorFilt ? 'filter' : undefined} aria-haspopup="true" onClick={this.handleClick}>
              {filterElement}<FilterIcon/>
            </Fab>

            {/* // ------ // Menu Filter Pop-up*/}
            <Menu id="simple-menus" anchorEl={anchorFilt} open={Boolean(anchorFilt)} onClose={this.handleClose}>
              <MenuItem onClick={()=>this.handleClose("ASK")}>Side - ASK</MenuItem>
              <MenuItem onClick={()=>this.handleClose("BID")}>Side - BID</MenuItem>
              <MenuItem onClick={()=>this.handleClose("BTC/AUD")}>TSP - BTC/AUD</MenuItem>
              <MenuItem onClick={()=>this.handleClose("ETH/AUD")}>TSP - ETH/AUD</MenuItem>
              <MenuItem onClick={()=>this.handleClose("ETH/BTC")}>TSP - ETH/BTC</MenuItem>
            </Menu>
          </section>  

          {/* // ------// Search bar */}
          <Paper className="searchCont">
            <InputBase placeholder="Search here…" className="searchBar" onChange={()=>this.handleFiltersEvents("Search")}/>
          </Paper>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Uuid</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Price ( $ )</TableCell>
                <TableCell>Trading pair symbol</TableCell>
              </TableRow>
            </TableHead>  

            <TableBody>
              {/* // ------ // Table data gets loaded here */}
              <Filter rowData={filteredTableData}/>
            </TableBody>  

            <TableFooter>
                <TableRow>
                  <TableCell className="Pagination">
                    <span>Rows per page:</span>

                    <div className="dropdown">
                      <Button size="small" aria-owns={anchorDrop ? '' : undefined}  aria-haspopup="true" onClick={this.handleClick}>
                        <span>{rowNumber}</span><IconDropdown/>
                      </Button>  
                      <Menu anchorEl={anchorDrop} open={Boolean(anchorDrop)} onClose={this.handleClose} >
                        <MenuItem onClick={()=>this.handleClose(5)}>5</MenuItem>
                        <MenuItem onClick={()=>this.handleClose(25)}>25</MenuItem>
                        <MenuItem onClick={()=>this.handleClose(50)}>50</MenuItem>
                      </Menu>
                    </div>  

                    <span className="pageSize">1-13 of 13</span>
                    <Fab className="Prov" onClick={()=>this.handlePagination("Prov")}><IconProv/></Fab>
                    <Fab className="Next" onClick={()=>this.handlePagination("Next")}><IconNext/></Fab>

                  </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    tableData: state.Trades_Data.data,
  };
}

export default connect(mapStateToProps)(Trades)
