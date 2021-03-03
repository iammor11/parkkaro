import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import PasswordIcon from '@material-ui/icons/VpnKey';
import Footer from '../Home/Footer';
import Header from '../Home/Header';
import { ThemeContext } from '../../ThemeContext'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const ResetPassword  = (props) => {
  const classes = useStyles();
  const [password, setPassword]= useState()
  const [showPassword, setShowPassword]= useState(false)
  const [result, setResult] = useState()
  const [error, setError] = useState()
  const [cookies] = useCookies(['token']);
  const [status] = useState(localStorage.getItem('status'))
  const [id] = useState(localStorage.getItem('id'))   
    
  useEffect(() => {
    setTimeout(() => {
     setResult(null)
     setError(null)
   }, 3000)}, [error, result])

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword) 
  };
    
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
      const res = await axios.patch(`https://parkkaro.herokuapp.com/api/reset/${props.match.params.token}`,{ password });
      setResult(res.data.message && res.data.message)
    } 
    catch (err) {
      setError(err.response && err.response.data.message)
    }
  }

  if(cookies.token && status==='admin') { return <Redirect to={`/admin/${id}`} />} 
  if(cookies.token && status==='user'){ return <Redirect to={`/user/${id}`} />}
  return(  
    <ThemeContext.Consumer>
    {(isLight) => (
      <>
      <Header />
    <div id="contact">
      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>Reset Password</h1>      
      <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
          className={classes.margin}
          required={true}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter Password"
          onChange={e => handleChange(e, setPassword)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}}
          />
      
      <br /><br />
    
      <input type="submit" className="btn" name="SUBMIT" value="SUBMIT" />
      </form>
       <br /><br />
    
    </div>    
    <Footer />  
    </>)}
    </ThemeContext.Consumer>
    )
}
export default ResetPassword