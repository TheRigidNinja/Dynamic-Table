import React from 'react'
import Button from '@material-ui/core/Button';
import { NavLink} from "react-router-dom";

function Withdraws() {

  return (
    <div>
        <h1>404 The Page cannot be found </h1>
        <NavLink to="/trades"><Button>Go to trades --></Button></NavLink>
    </div>
  )
}

export default Withdraws
