import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Dark from "../../Images/3.png";
import Light from "../../Images/1.png";
import DarkMode from './DarkMode'
import MyModal from './Modal';
import { ThemeContext } from '../../ThemeContext'
import MenuIcon from '@material-ui/icons/Menu';
const Header  = (props) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false)
  const handleOpen = () => {
    setShow(!show)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handletoggle = () => {
    console.log("hi")
    setShow(!show)
  }

  return(
    <ThemeContext.Consumer>
    {(isLight) => (
        <>
    <div style={{backgroundColor: isLight==='true' ? null : 'black', overflow: show && 'visible', height: show && 'auto'}} id="header">
  <button className="navbar-toggler" style={{cursor: 'pointer', margin: '25px 0 0 15px'}} onClick={handletoggle}>
      <MenuIcon />
      </button> 

      <div className="logo inline" id="logoPart" onClick={handletoggle}>
        <NavLink to="/" >
        {isLight==='true' ? <img src={Dark} id="logoImg" alt="logo" />
    : <img src={Light} id="logoImg" alt="logo" />
        }

        </NavLink>
      </div>
      
      <div className={isLight==='true' ? 'inline' : 'inlineDark inline'} id="mainPart">
        <ul>
          <li><NavLink to="/" onClick={handleOpen}>How it works</NavLink></li>
          <li><NavLink onClick={handletoggle} to="/help">Help</NavLink></li>
          <li><NavLink onClick={handletoggle} to="/business">Business</NavLink></li>
        </ul>
      </div>

      <div className={isLight==='true' ? 'inline' : 'inlineDark inline'} id="logPart">
        <ul>
          <li><NavLink onClick={handletoggle} to="/login">Log in</NavLink></li>
          <li><NavLink onClick={handletoggle} to="/signup">Sign up</NavLink></li>
        </ul>
      </div>

      <div id="darkPart">
      <DarkMode isLight={props.isLight} handleChangeTheme={props.handleChangeTheme}/>
      </div>

      <MyModal open={open} handleClose={handleClose} />
      </div>
      </>)}
      </ThemeContext.Consumer>
    )
}
export default Header