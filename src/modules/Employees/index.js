import React from 'react'
import {
    Typography, makeStyles, Button
} from '@material-ui/core';
import ReturnButton from "../../components/ReturnButton";
import EmployeeList from "./EmployeeList";
const useStyles = makeStyles(theme => ({
    employeesBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em 20em 10em 20em',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const Employees = ({ location }) => {
    const user = location.state

    const classes = useStyles()

    return (
        <div className={classes.employeesBox}>
            <EmployeeList />
            <ReturnButton previousRoute="dashboard" user={user} style={{ marginTop: '2em' }} />
        </div>
    )
}

export default Employees

