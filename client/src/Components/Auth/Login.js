import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
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

const Login  = (props) => {
    const classes = useStyles();
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const [showPassword, setShowPassword]= useState(false)
    const [cookies, setCookie] = useCookies(['token']);
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword) 
    };
    
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };

    useEffect(() => {
      setTimeout(() => {
       setError(null)
     }, 3000)}, [error])

   const handleChange = (e, setValue) => {
     setValue(e.target.value)
   }
   
   const handleSubmit = async (e) => {
     e.preventDefault()
     try {
      const res = await axios.post('https://parkkaro.herokuapp.com/api/login', { email, password})
      setResult(res.data.message && res.data.message) 
      setCookie('token', res.data.token)
      localStorage.setItem('id', res.data.id)
      localStorage.setItem('status', res.data.status)
      res.data.status === 'user' ? props.history.push(`/user/${res.data.id}`) : props.history.push(`/admin/${res.data.id}`)
    } catch (err) {
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
      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>Login</h1>      
      <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>   
      <form onSubmit={handleSubmit}>
      <TextField
      style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Email"
        type="email"
        required={true}
        onChange={e => handleChange(e, setEmail)}
        placeholder="Enter Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />

      <br /><br />
      <TextField
      style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        required={true}
        onChange={e => handleChange(e, setPassword)}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter Password"
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
      <p style={{color : isLight==='true' ? null : 'white'}}>Forgot your password? &nbsp;
      <NavLink style={{color: '#3f51b5', textDecoration: 'none'}} to="/reset">Reset</NavLink>
      </p> 
      <p style={{color : isLight==='true' ? null : 'white'}}>Admin's email and password is iammor11@gmail.com and 123456789 respectively, you can check out admin dashboard too</p>
    </div>
    <Footer />
    </>)}
    </ThemeContext.Consumer>
  )
}
export default Login