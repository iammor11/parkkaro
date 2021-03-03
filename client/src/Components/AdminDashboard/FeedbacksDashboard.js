import React, { useState } from 'react'
import { Redirect } from 'react-router-dom' 
import { useCookies } from 'react-cookie';
import DashboardLayout from '../Admin/DashboardLayout'
import Feedbacks from '../Admin/Feedbacks'

const FeedbackDashboard = (props) => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))

    if (!cookies.token) return <Redirect to={'/'} />;
    if (!status) return <Redirect to={'/'} />;    
    if (status==='user') return <Redirect to={'/'} />;    
    return(
        <DashboardLayout  child={<Feedbacks /> } />
    )
}
export default FeedbackDashboard