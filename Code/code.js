import React, { Component } from 'react';
import { NavLink} from "react-router-dom";

import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import FilterIcon from '@material-ui/icons/FilterListRounded'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import Filter from './Filter';

import IconNext from '@material-ui/icons/ChevronRight'
import IconProv from '@material-ui/icons/ChevronLeft'
import IconDropdown from '@material-ui/icons/ArrowDropDown'
class Trades extends Component {
  state = {
    anchorFilt: null,
    anchorDrop: null,
    tableData: [],
    pageMenu: false,
    filterElement: "",
    rowNumber: 5,
    didReceiveProps: false
  }
 



componentDidUpdate(){
  document.addEventListener("load",this.Windowload());
}


Windowload =()=>{
  if(this.state.didReceiveProps == false){
    this.handleFilters()
    this.setState({
      // tableData: this.props.tableData.trades,
      didReceiveProps: true
    })
  }
}

handleClick = (event) => {
  if(event.currentTarget.parentElement.className === "filter"){
    this.setState({anchorFilt:event.currentTarget });
  }else{
    this.setState({ anchorDrop: event.currentTarget});
  }
};


handleClose = (info) => {
  this.setState({anchorFilt:null, anchorDrop: null});
  // Executes this when ev
  this.handleFilters(info);    
};


  // Sets filter value
  handleFilters=(info)=>{
    
    let rageUpdatedAt = false,
    rangeKey = null,
    searchVal = null,
    uuid = false,
    volume = false,
    price = false,
    filter = false,
    emptyFilter = false,
    filterElement =  filterElement = ["ASK","BID","BTC/AUD","ETH/AUD","ETH/BTC"].includes(info)?info:"--";


    switch(true){
      case "Next":
      break;

      case "Prov":
      break;

      case ["ASK","BID","BTC/AUD","ETH/AUD","ETH/BTC"].includes(info):
        this.setState({filterElement: info});
        emptyFilter = true;
      break;

      default:
        console.log("FAILED")
    }

    // Makes sure you have a range between something
  if(info === "Search"){
      searchVal = document.querySelector(".searchBar")
      .querySelector("input").value.replace(/\s/g, '').toLowerCase();

      filterElement = this.state.filterElement;

    if(/[a-zA-Z]/.test(searchVal) !=true){
      switch(true){
        case searchVal.indexOf("-")>=0:
          rangeKey="-"
        break;
        case searchVal.indexOf("to")>=0:
          rangeKey="to"
          console.log("-->")
        break;
        case searchVal.indexOf("&")>=0:
          rangeKey="&"
        break;
        case searchVal.indexOf("and")>=0:
          rangeKey="and"
        break;
      }

      if(rangeKey !== null){
        rangeKey = searchVal.split(rangeKey);
        let holdVal = Math.max(Number(rangeKey[0]),Number(rangeKey[1]))
        rangeKey[0] = Math.min(Number(rangeKey[0]),Number(rangeKey[1]))
        rangeKey[1] = holdVal;
      }
    }
  }

  // Rules for filters
  const filteredArray = this.props.tableData.trades.filter(filt => {
    // Filters
    if(filt["side"] == filterElement){
      filter = true;
    }else if(filt["tradingPair"]["symbol"] == filterElement){
      filter = true;
    }else if(filterElement ==""){
      filter = true;
    }else{
      filter = false;
    }

    // It only runs when its absolutly needed
    if(rangeKey == null){
      uuid = filt["uuid"].toLowerCase().indexOf(searchVal)>=0;
      volume = filt["volume"].indexOf(searchVal)>=0;
      price = filt["price"].indexOf(searchVal)>=0;
    }

    // Calculating range
    if (rangeKey !== null && filt["updatedAt"] >= rangeKey[0] && 
    filt["updatedAt"] <= rangeKey[1]){
      rageUpdatedAt = true;
    }else{
      rageUpdatedAt = false;
    }

    // console.log((rageUpdatedAt || uuid || volume|| price))
    // (filter && 
    return( filter &&  (filt["key"] < 5) && (rageUpdatedAt || uuid || emptyFilter || volume|| price))
  })
  
  // .then(()=>{
  //   console.log("this")
  // })

  // this.setState({tableData: filteredArray})


  // setTimeout(function(){},2000)
  
  // console.log(this.state.tableData,"-----",filteredArray)

  }


  render() {
    const {pageMenu,filterElement,anchorFilt,anchorDrop,tableData} = this.state

    return(
      <div className="TableContainer">
        <NavLink to="/withdraws"><Button variant="contained" size="large" color="primary" className="navBTN_next">Withdraws<i className="material-icons">navigate_next</i></Button></NavLink>

        <Paper className="paper">
          <Button variant="outlined" size="large" color="primary" className="clear" onClick={()=>this.handleFilters("Reset")}>Reset</Button>
            
          <section className="filter" >
            <Fab variant="extended" aria-owns={anchorFilt ? 'filter' : undefined} aria-haspopup="true" onClick={this.handleClick}>
              {filterElement}<FilterIcon/>
            </Fab>
            <Menu id="simple-menus" anchorEl={anchorFilt} open={Boolean(anchorFilt)} onClose={this.handleClose}>
              <MenuItem onClick={()=>this.handleClose("ASK")}>Side - ASK</MenuItem>
              <MenuItem onClick={()=>this.handleClose("BID")}>Side - BID</MenuItem>
              <MenuItem onClick={()=>this.handleClose("BTC/AUD")}>TSP - BTC/AUD</MenuItem>
              <MenuItem onClick={()=>this.handleClose("ETH/AUD")}>TSP - ETH/AUD</MenuItem>
              <MenuItem onClick={()=>this.handleClose("ETH/BTC")}>TSP - ETH/BTC</MenuItem>
            </Menu>
          </section>

          <Paper className="searchCont">
            <InputBase placeholder="Search here…" className="searchBar" onChange={()=>this.handleFilters("Search")}/>
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
              <Filter rowData={tableData}/>
            </TableBody>

            <TableFooter>
               <TableRow>
                <TableCell className="Pagination">
                   <span>Rows per page:</span>
                   
                   <div className="dropdown">
                      <Button size="small" aria-owns={anchorDrop ? '' : undefined} aria-haspopup="true" onClick={this.handleClick}>
                      <span>5</span><IconDropdown/>
                      </Button>

                      <Menu anchorEl={anchorDrop} open={Boolean(anchorDrop)} onClose={this.handleClose}>
                        <MenuItem onClick={()=>this.handleClose(5)}>5</MenuItem>
                        <MenuItem onClick={()=>this.handleClose(25)}>25</MenuItem>
                        <MenuItem onClick={()=>this.handleClose(50)}>50</MenuItem>
                      </Menu>
                    </div>

                  <span className="pageSize">1-13 of 13</span>
                  <Fab className="Prov" onClick={()=>this.handleFilters("Prov")}><IconProv/></Fab>
                  <Fab className="Next" onClick={()=>this.handleFilters("Next")}><IconNext/></Fab>

                 </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return { 
    tableData: state.Trades_Data.data,
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Trades)
