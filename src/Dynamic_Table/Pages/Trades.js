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

class Trades extends Component {
  state = {
    table_Data: []
  }

  handleChange=()=>{
    console.log(this.props)
    // this.props
  }

  render() {
    return(
      <div className="TableContainer">
        <NavLink to="/withdraws"><Button variant="contained" size="large" color="primary" className="navBTN_next">Withdraws<i className="material-icons">navigate_next</i></Button></NavLink>

        <Paper className="paper">

          <div>
            <Button variant="outlined" size="large" color="primary" className="clear">Reset</Button>

            <div className="filter" >
              <Fab variant="extended" aria-label="Filter" onClick={this} className="btn"><FilterIcon/></Fab>
            </div>

             <Paper className="searchCont">
                <InputBase placeholder="Search here…" className="searchBar" onChange={this.handleChange}/>
             </Paper>
          </div>

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
              <Filter rowData={this.props.table_Data} />
            </TableBody>

            <TableFooter>
            <TableRow>
              {/* <TablePagination rowsPerPageOptions={[5, 10, 25]}
                    count={10}
                    rowsPerPage={1}
                    page={2}
                    // ActionsComponent={TablePaginationActionsWrapped}
                  /> */}
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
    // Trades_Data: (data) => {dispatch({type:'UPDATE_TRADE',data:data})},
    // Withdraws_Data: (data) => { dispatch({ type: 'UPDATE_WITHDRAWS', data: data }) }
  }
}

const mapStateToProps = (state) => {
  return { 
    table_Data: state.Trades_Data.data,
    Filter: (filt) => { Filter(filt) },
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Trades)
