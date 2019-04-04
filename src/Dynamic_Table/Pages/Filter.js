import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';



function Filter(rowData) {
  var filterValue = rowData.filter.table_Data,
  rowData = rowData.rowData;

  if (rowData != undefined){
    console.log(filterValue)

    const row = rowData.trades.filter(filt => filt.key < 5 && (filt["uuid"].toLowerCase().indexOf(filterValue)>=0 || filt["volume"].toLowerCase().indexOf(filterValue)>=0 || filt["price"].toLowerCase().indexOf(filterValue)>=0)).map(row =>{
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
  }
  return <TableBody>Loading...</TableBody>
  
}

export default Filter
