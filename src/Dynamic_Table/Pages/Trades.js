import React, { Component } from 'react';
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import Filter from './Functions/Filter';
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
import ExtendFun from './Functions/ExtendFun';


class Trades extends Component {
  state = {
    newState:{
      anchorFilt: null,
      anchorDrop: null,
      pageNumber: 1,
      setStateProps: false,
      filterElement: null,
      rowNumber: 5,
      filteredTableData: [],
      tableSemiFilteredData:[],
      tableData: []
    },
    didReceiveProps:false
  }


  componentDidMount(){
    this.pageLoad();
  }

  getSnapshotBeforeUpdate() {
    return null
  }

  componentDidUpdate(){
    this.pageLoad();
  }

  pageLoad = () =>{
    // console.log(this.props.tableData)
    if(this.state.didReceiveProps === false && this.props.tableData !== undefined){
      ExtendFun.state.tableData = this.props.tableData;
      ExtendFun.state.pageType = "Trades";
      this.setState({didReceiveProps: true},()=>{this.DataCollector("Load")})
    }
  }

  DataCollector=(data)=>{ 
    // ------ // Handles click events
    if(typeof(data) === "object" && data[1] === "HandleClick"){
      ExtendFun.handleClick(data[0]);
    }

    // ------ // Handles close events
    if(typeof(data) === "object" && data[0] === "HandleClose"){
      ExtendFun.handleClose(data[1])
    }

    // ------ // Handles Reset
    if(data === "Reset"){
      ExtendFun.handleReset();
    }

    // ------ // Handle Pagination
    if(data === "Prov" || data === "Next"){
      ExtendFun.handlePagination(data);
    }

    if(data === "Search" || data === "Load"){
      ExtendFun.handleFiltersEvents(data);
    }

    // ------ // Reasign state with new data from another state of ExtendFun
    this.setState({newState:ExtendFun.state});
  }


  render() {
    const {pageNumber,filterElement,anchorFilt,anchorDrop,rowNumber,filteredTableData,tableSemiFilteredData} = this.state.newState;

    return(
      <div className="TableContainer">
        <NavLink to="/withdraws"><Button variant="contained" size="large" color="primary" className="navBTN_next" onClick={()=>this.DataCollector("Reset")}>Withdraws<i className="material-icons">navigate_next</i></Button></NavLink>  

        <Paper className="paper">
          <Button variant="outlined" size="large" color="primary" className="clear" onClick={()=>this.DataCollector("Reset")}>Reset</Button>     

          {/* // ------ // Filter icon*/}
          <section className="filter" >
            <Fab variant="extended" aria-owns={anchorFilt ? 'filter' : undefined} aria-haspopup="true" onClick={(event)=>this.DataCollector([event,"HandleClick"])}>
              {filterElement}<FilterIcon/>
            </Fab>

            {/* // ------ // Menu Filter Pop-up*/}
            <Menu id="simple-menus" anchorEl={anchorFilt} open={Boolean(anchorFilt)} onClose={(event)=>this.DataCollector([event,"HandleClose"])}>
              <MenuItem onClick={()=>this.DataCollector(["HandleClose","ASK"])}>ASK</MenuItem>
              <MenuItem onClick={()=>this.DataCollector(["HandleClose","ETH/AUD"])}>ETH/AUD</MenuItem>
              <MenuItem onClick={()=>this.DataCollector(["HandleClose","ETH/BTC"])}>ETH/BTC</MenuItem>
            </Menu>
          </section>  

          {/* // ------// Search bar */}
          <Paper className="searchCont">
            <InputBase placeholder="Search here…" className="searchBar" onChange={()=>this.DataCollector("Search")}/>
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
              <Filter rowData={filteredTableData} pageType="Trades"/>
            </TableBody>  

            <TableFooter>
                <TableRow>
                  <TableCell className="Pagination">
                    <span>Rows per page:</span>

                    <div className="dropdown">
                      <Button size="small" aria-owns={anchorDrop ? '' : undefined}  aria-haspopup="true" onClick={(event)=>this.DataCollector([event,"HandleClick"])}>
                        <span>{rowNumber}</span><IconDropdown/>
                      </Button>  
                      <Menu anchorEl={anchorDrop} open={Boolean(anchorDrop)} onClose={(event)=>this.DataCollector("HandleClose")}>
                        <MenuItem onClick={()=>this.DataCollector(["HandleClose",5])}>5</MenuItem>
                        <MenuItem onClick={()=>this.DataCollector(["HandleClose",10])}>10</MenuItem>
                        <MenuItem onClick={()=>this.DataCollector(["HandleClose",20])}>20</MenuItem>
                        <MenuItem onClick={()=>this.DataCollector(["HandleClose",40])}>40</MenuItem>
                      </Menu>
                    </div>  

                    <span className="pageSize">{pageNumber+" - "+rowNumber} of {Math.ceil(tableSemiFilteredData.length/rowNumber)}</span>
                    <Fab className="Prov" onClick={()=>this.DataCollector("Prov")}><IconProv/></Fab>
                    <Fab className="Next" onClick={()=>this.DataCollector("Next")}><IconNext/></Fab>

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
