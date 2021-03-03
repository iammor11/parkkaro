import React, { useState } from 'react'
import { Redirect } from 'react-router-dom' 
import { useCookies } from 'react-cookie';
import DashboardLayout from '../User/DashboardLayout'
import Feedback from '../User/Feedback'

const FeedbackDashboard = (props) => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))

    if (!cookies.token) return <Redirect to={'/'} />;
    if (!status) return <Redirect to={'/'} />;    
    if (status==='admin') return <Redirect to={'/'} />;  
    return(
        <DashboardLayout  child={<Feedback /> } />
    )
}
export default FeedbackDashboard