import React from 'react'
import { Redirect } from 'react-router-dom'
import Dashboard from "./Dashboard";

const DashboardContainer = ({ location }) => {
    const user = location.state

    return (
        user ? <Dashboard user={user} /> : <Redirect to={{ pathname: '/login' }} />
    )
}

export default DashboardContainer
