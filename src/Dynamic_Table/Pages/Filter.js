import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function Filter({rowData}) {
  // console.log(rowData)
  if (rowData != undefined && rowData.length > 0){    
    const row = rowData.map(row =>{
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
  return(<TableRow><TableCell><br/>Loading ...</TableCell>
  </TableRow>)
  
}

export default Filter
