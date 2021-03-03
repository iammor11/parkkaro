import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Footer from '../Home/Footer';
import Header from '../Home/Header';
import { ThemeContext } from '../../ThemeContext'

const VerifiedEmail  = (props) => {
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
      
    useEffect(() => {
       setTimeout(() => {
        setError(null)
      }, 3000)}, [error])
    
    const handleSubmit = async (e) => {
      e.preventDefault()      
      try { 
        const res = await axios.patch(`https://parkkaro.herokuapp.com/api/verify/${props.match.params.token}`)
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
    <h1 className="h1Size" style={{color : isLight==='true' ? null : 'white'}}>Verify your email</h1>  
    
    <h3 style={{color: error ? 'red' : '#3f51b5'}}>{error ? error : result ? result : null}</h3>    
      <p style={{color : isLight==='true' ? null : 'white'}}>Click on the below button to verify your email</p>
      
      <br /><br />
      <button type="submit" className="btn" name="SUBMIT" value="SUBMIT" onClick={handleSubmit} >Verify</button>
  </div>
  <Footer />
  </>)}
    </ThemeContext.Consumer>
    )
}
export default VerifiedEmail