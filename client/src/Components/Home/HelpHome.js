import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Footer from './Footer'
import Header from './Header'
import Help from './Help'

const HelpHome = () => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))
    const [id] = useState(localStorage.getItem('id'))   
    
    if(cookies.token && status==='admin') { return <Redirect to={`/admin/${id}`} />} 
    if(cookies.token && status==='user'){ return <Redirect to={`/user/${id}`} />}
    return(
        <>
        <Header />
        <Help />
        <Footer />
        </>
    )
}
export default HelpHome