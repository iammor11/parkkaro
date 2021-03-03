import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from './Header'
import SearchSpace from './SearchSpace'
import About from './About'
import HowItWorks from './HowItWorks'
import Reviews from './Reviews'
import ParkingProvider from './ParkingProvider'
import Help from './Help'
import Footer from './Footer'

const Home = (props) => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
    
    if(cookies.token && status==='admin') { return <Redirect to={`/admin/${id}`} />} 
    if(cookies.token && status==='user'){ return <Redirect to={`/user/${id}`} />}
    return(
    <>
    <Header isLight={props.isLight} handleChangeTheme={props.handleChangeTheme} />
    <SearchSpace isLight={props.isLight} /> 
    <About isLight={props.isLight} />
    <HowItWorks isLight={props.isLight} />
    <Reviews isLight={props.isLight} />
    <ParkingProvider isLight={props.isLight} />
    <Help isLight={props.isLight} />
    <Footer isLight={props.isLight} />
    </>
    );
}
export default Home;