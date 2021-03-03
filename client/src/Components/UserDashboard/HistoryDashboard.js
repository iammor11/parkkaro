import React, { useState } from 'react'
import { Redirect } from 'react-router-dom' 
import { useCookies } from 'react-cookie';
import DashboardLayout from '../User/DashboardLayout'
import UserHistory from '../User/UserHistory'

const HistoryDashboard = (props) => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))

    if (!cookies.token) return <Redirect to={'/'} />;
    if (!status) return <Redirect to={'/'} />;    
    if (status==='admin') return <Redirect to={'/'} />;  
    return(
        <DashboardLayout  child={<UserHistory /> } />
    )
}
export default HistoryDashboard