import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import InputMask from 'react-input-mask';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import MessageIcon from '@material-ui/icons/Message';
import ResponseModal from './ResponseModal'
import { ThemeContext } from '../../ThemeContext'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const Help  = (props) => {
  const classes = useStyles();
  const [name, setName] = useState()
  const [mblno, setMblno] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [result, setResult] = useState()
  const [error, setError] = useState()

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://parkkaro.herokuapp.com/api/help/create', { name, mblno, email, message})
      setResult(res.data.message && res.data.message) 
      handleOpen()
    } catch (err) {
      setError(err.response ? err.response.data.message : "Netwrok Error!")
      handleOpen()
    }
  }
  
  return(
  <ThemeContext.Consumer>
    {(isLight) => (
        <>
    <div className="query">   
      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>How can I help you</h1>   
     <form onSubmit={handleSubmit}>
      <TextField
        style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Name"
        type="text"
        required={true}
        onChange={e => handleChange(e, setName)}
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
      <InputMask mask="03999999999" maskChar=" " onChange={e => handleChange(e, setMblno)}>
    {() =>        <TextField
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
      <TextField
      style={{backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
        className={classes.margin}
        label="Message"
        type="text"
        required={true}
        onChange={e => handleChange(e, setMessage)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MessageIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <br /><br />
      <input type="submit" className={isLight==='true' ? 'btn' : 'btnDark'} name="SUBMIT" value="SUBMIT" />
      </form>
    </div>
      <ResponseModal result={result} error={error} open={open} handleClose={handleClose}/>
  
      </>)}
    </ThemeContext.Consumer>
    )
}
export default Help