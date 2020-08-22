import React from 'react'
import {makeStyles, Typography} from '@material-ui/core';
import ReturnButton from "../../components/ReturnButton";
import EmployeeList from "./EmployeeList";
import {Redirect} from "react-router-dom"
const useStyles = makeStyles(theme => ({
    employeesBox: {
        backgroundColor: '#213b58',
        padding: '56px',
        borderRadius: 10,
        margin: '10em',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const Employees = ({ location }) => {
    const user = location.state

    const classes = useStyles()

    return (
        user
            ?
            <div className={classes.employeesBox}>
                <Typography variant="h5" style={{ color: 'white '}}>Employee List</Typography>
                <EmployeeList role={user.role} />
                <ReturnButton previousRoute="dashboard" user={user} style={{ marginTop: '2em' }} />
            </div>
            : <Redirect to={{ pathname: '/login' }} />
    )
}

export default Employees

