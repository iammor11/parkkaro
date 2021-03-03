import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { ThemeContext } from '../../ThemeContext'

const ParkingProvider = () => {
  return(
    <ThemeContext.Consumer>
    {(isLight) => (
        <>
    <div className="query">
    <NavLink to="/business">
    <Button style={{width: '100%', backgroundColor: isLight==='true' ? null : 'white', color: isLight==='true' ? null : '#3f51b5'}} variant="contained" color="primary" disableElevation>
      <h1>ARE YOU A PARKING PROVIDER?
      <br />
      PARKKARO can help you.
      </h1>
    </Button>    
    </NavLink>
    </div>
    </>)}
    </ThemeContext.Consumer>
  )
}
export default ParkingProvider