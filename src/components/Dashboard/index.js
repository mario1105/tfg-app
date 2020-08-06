import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import Dashboard from "./Dashboard";

const DashboardRouter = ({ nextRoute }) =>
    nextRoute
        ? <Redirect to={{ pathname: `/${nextRoute}` }} />
        : <Redirect to={{ pathname: '/login' }} />

const DashboardContainer = ({ location }) => {
    const [nextRoute, setNextRoute] = useState(null)

    const handleNextRoute = (newNextRoute) => setNextRoute(newNextRoute)

    const user = location.state

    return (
        user && !nextRoute
            ? <Dashboard user={user} nextRoute={nextRoute} handleNextRoute={handleNextRoute} />
            : <DashboardRouter nextRoute={nextRoute} />
    )
}

export default DashboardContainer
