import React from 'react'
import {
    Typography, makeStyles, Button
} from '@material-ui/core';
import ReturnButton from "../../components/ReturnButton";

const useStyles = makeStyles(theme => ({
    employeesBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em 40em 10em 40em',
    }
}))

const EmployeeList = ({ location }) => {
    const user = location.state

    const classes = useStyles()

    return (
        <div className={classes.employeesBox}>
            <ReturnButton previousRoute="dashboard" user={user} />
        </div>
    )
}

export default EmployeeList

