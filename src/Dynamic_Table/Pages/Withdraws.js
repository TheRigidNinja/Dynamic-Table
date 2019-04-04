import React from 'react'
import Button from '@material-ui/core/Button';
import { NavLink} from "react-router-dom";

function Withdraws() {

  return (
    <div>
        <NavLink to="/trades"><Button variant="contained" size="large" color="primary" className="navBTN_prov"><i class="material-icons">navigate_before</i>Trades</Button>
        </NavLink>
        
    </div>
  )
}

export default Withdraws
