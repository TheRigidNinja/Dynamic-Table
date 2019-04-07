import React from 'react'
import Button from '@material-ui/core/Button';
import { NavLink} from "react-router-dom";

function E404() {

  return (
    <div className="errorPage">
        <h1>404!</h1>
        <h2>The Page cannot be found </h2>
        <NavLink to="/trades"><Button color="secondary">Go to trades --></Button></NavLink>
    </div>
  )
}

export default E404
