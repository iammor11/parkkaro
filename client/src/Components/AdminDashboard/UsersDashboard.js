import React, { useState } from 'react'
import { Redirect } from 'react-router-dom' 
import { useCookies } from 'react-cookie';
import DashboardLayout from '../Admin/DashboardLayout'
import Users from '../Admin/Users'

const UsersDashboard = (props) => {
    const [cookies] = useCookies(['token']);
    const [status] = useState(localStorage.getItem('status'))

    if (!cookies.token) return <Redirect to={'/'} />;
    if (!status) return <Redirect to={'/'} />;    
    if (status==='user') return <Redirect to={'/'} />;    
    return(
        <DashboardLayout  child={<Users /> } />
    )
}
export default UsersDashboard