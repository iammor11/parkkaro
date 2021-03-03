import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
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

const SignUp  = () => {
    const classes = useStyles();
    const [first_name, setFirst_name]= useState()    
    const [last_name, setLast_name]= useState()
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const [mblno, setMblno]= useState()
    const [showPassword, setShowPassword]= useState(false)
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
        
  useEffect(() => {
    setTimeout(() => {
     setError(null)
   }, 3000)}, [error])

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword) 
    };
  
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };
    
    const handleChange = (e, setValue) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post('https://parkkaro.herokuapp.com/api/signup',{first_name, last_name, email, password, mblno});
          setResult(res.data.message && res.data.message)     
        } 
        catch (error) {
         setError(error.response && error.response.data.message)
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
      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>Sign Up</h1> 
      <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>   
      <form onSubmit={handleSubmit}>          
      <TextField
      style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="First Name"
        type="text"
        required={true}
        placeholder="Enter First Name"
        onChange={e => handleChange(e, setFirst_name)}
        InputProps={{     
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      
      <br /><br />
      <TextField
      style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Last Name"
        type="text"
        required={true}
        placeholder="Enter Last Name"
        onChange={e => handleChange(e, setLast_name)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <br /><br />
      <TextField
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Email"
        type="email"
        required={true}
        placeholder="Enter Email"
        onChange={e => handleChange(e, setEmail)}
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
        onChange={e => handleChange(e, setPassword)}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        required={true}
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
      <InputMask mask="03999999999" maskChar=" " onChange={e => handleChange(e, setMblno)}>
        {() => <TextField
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Mobile No"
        type="tel"
        required={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      /> }
      </InputMask>
      <br /><br />

      <input type="submit" className="btn" name="SUBMIT" value="SUBMIT" />
      </form>    <br /><br />
    </div>    
    <Footer />
        </>)}
      </ThemeContext.Consumer>
    )
}
export default SignUp