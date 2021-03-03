import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment }  from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const Feedback = () => {
  const classes = useStyles();    

  const [cookies] = useCookies(['token']);
  const [message, setMessage] = useState()
  const [result, setResult] = useState()
  const [error, setError] = useState()

  useEffect(() => {
     setTimeout(() => {
      setResult(null)
      setError(null)
    }, 3000)}, [error, result])

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://parkkaro.herokuapp.com/api/feedback/create',
       { message 
        },
      {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
  })
      setResult(res.data.message) 
    } catch (err) {
      setError(err.response.data.message)
    }
  }
    return(
  <div id="contact" style={{backgroundColor: 'white'}}>   
      <h1 className="h1Size">Give your Feedback!</h1>   
      <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>   
      <br /><br />
      <form onSubmit={handleSubmit}>
      <TextField
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
      <input type="submit" className="btn" name="SUBMIT" value="SUBMIT" />
      </form>
    </div>

    )
}
export default Feedback