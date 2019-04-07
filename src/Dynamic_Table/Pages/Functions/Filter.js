import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// ------ // 
function Filter(rowData) {
  let pageType = rowData.pageType,
  tableRowData = rowData.rowData;

  if (tableRowData !== undefined && tableRowData.length > 0 && pageType === "Trades"){    
    const row = tableRowData.map(row =>{
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

  }else if(tableRowData !== undefined && tableRowData.length > 0 && pageType === "Withdraw"){
    const row = tableRowData.map(row =>{
      return(
        <TableRow key={row.key}>
          <TableCell align="left">{row.uuid}</TableCell>
          <TableCell align="left">{row.createdAt}</TableCell>
          <TableCell align="left">{row.status}</TableCell>
          <TableCell align="left">{row.amount}</TableCell>
          <TableCell align="left">{row.bankReferenceNumber}</TableCell>
        </TableRow>
      )
    })
    return row
  }
  return(<TableRow><TableCell><br/>Loading ...</TableCell>
  </TableRow>) 
}

export default Filter
