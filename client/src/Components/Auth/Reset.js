import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Footer from '../Home/Footer';
import Header from '../Home/Header';
import { ThemeContext } from '../../ThemeContext'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const Reset  = () => {
    const classes = useStyles();
    const [email, setEmail]= useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
    
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
        const res = await axios.post('https://parkkaro.herokuapp.com/api/reset',{email});
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
      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>Mail will be send to your email adddress for reset password</h1>        
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
      <input type="submit" className="btn" name="SUBMIT" value="SUBMIT" />
      </form>
      <br /><br />
    </div>
    <Footer />
    </>)}
    </ThemeContext.Consumer>
  )
}
export default Reset