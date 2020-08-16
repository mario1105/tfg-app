import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import Dashboard from "./Dashboard";

const DashboardRouter = ({ nextRoute, user }) =>
    nextRoute
        ? <Redirect to={{ pathname: `/${nextRoute}`, state: user }} />
        : <Redirect to={{ pathname: '/login' }} />

const DashboardContainer = ({ location }) => {
    const [nextRoute, setNextRoute] = useState(null)

    const handleNextRoute = (newNextRoute) => setNextRoute(newNextRoute)

    const user = location.state

    return (
        user && !nextRoute
            ? <Dashboard user={user} handleNextRoute={handleNextRoute} />
            : <DashboardRouter nextRoute={nextRoute} user={user} />
    )
}

export default DashboardContainer
