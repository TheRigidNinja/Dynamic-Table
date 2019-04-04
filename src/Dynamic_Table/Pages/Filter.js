import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";


class Trades extends Component {

// function Filter({rowData}) {
//   console.log(this)
//   const searchFilter=()=>{
    
//     console.log("Yess!")
//   }

  // Takes searchFilter function globaly
  // this.props.EventFilters(searchFilter)
  

  if (rowData != undefined){
    const row = rowData.trades.map(row =>{
      
      // console.log(row)
      return(
        <TableRow key={row.key}>
          <TableCell align="left">{row.uuid}</TableCell>
          <TableCell align="left">{row.updatedAt}</TableCell>
          <TableCell align="left">{row.side}</TableCell>
          <TableCell align="left">{row.volume}</TableCell>
          <TableCell align="left">{row.price}</TableCell>
          <TableCell align="left">{row.tradingPair["symbol"]}</TableCell>
        </TableRow>
      )
    })
    return row
  }else{
    return <TableBody>Loading...</TableBody>
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    EventFilters: (filt) => {dispatch({type:'PASSFUN',filt:filt})}
  }
}
export default connect(null, mapDispatchToProps)(Filter)