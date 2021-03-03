import React, { useState } from 'react'
import axios from 'axios'
import InputMask from 'react-input-mask';
import { TextField, InputAdornment }  from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ResponseModal from './ResponseModal'
import { ThemeContext } from '../../ThemeContext'

const Business = (props) => {
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
      const res = await axios.post('https://parkkaro.herokuapp.com/api/business/create', { name, mblno, email, message})
      setResult(res.data.message && res.data.message)
      handleOpen() 
    } catch (err) {
      setError(err.response ? err.response.data.message : "Network Error!")
      handleOpen()
    }
  }

  return(
    <ThemeContext.Consumer>
    {(isLight) => (
        <>
    <div className="query">
     
    <div style={{backgroundColor: '#3f51b5'}} variant="contained" color="primary" disableElevation>
      <br /><br />
      <h1>PARKKARO</h1>
      <h3>Our parking system is designed to reduce park abuse, delight customers, and maximise revenue.</h3>
    <br /><br />
    </div>   

      <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>For Business</h1>
      <h1 style={{color : isLight==='true' ? null : 'white'}}>
        This could be the beginning of a beautiful relationship
        <FavoriteIcon style={{color: 'red'}} />
        <FavoriteIcon style={{color: 'red'}} />
        <FavoriteIcon style={{color: 'red'}} />
      </h1>
      <form onSubmit={handleSubmit}>
      <TextField
        style={{margin: '8px', backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
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
        style={{margin: '8px', backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
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
      {() => <TextField
        style={{margin: '8px', backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
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
        style={{margin: '8px', backgroundColor : isLight==='true' ? null : 'white', borderRadius : isLight==='true' ? null : '5px', border : isLight==='true' ? null : '3px solid white'}}
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
      <input type="submit" className="btn" name="SUBMIT" value="SUBMIT" />
      </form>
    </div>
    <br /><br />
    <ResponseModal result={result} error={error} open={open} handleClose={handleClose}/>
    </>)}
    </ThemeContext.Consumer>
    )
}
export default Business