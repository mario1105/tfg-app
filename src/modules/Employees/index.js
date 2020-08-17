import React from 'react'
import {makeStyles, Typography} from '@material-ui/core';
import ReturnButton from "../../components/ReturnButton";
import EmployeeList from "./EmployeeList";
const useStyles = makeStyles(theme => ({
    employeesBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const Employees = ({ location }) => {
    const user = location.state
console.log(user)
    const classes = useStyles()

    return (
        <div className={classes.employeesBox}>
            <Typography variant="h5" style={{ color: 'white '}}>Employee List</Typography>
            <EmployeeList role={user.role} />
            <ReturnButton previousRoute="dashboard" user={user} style={{ marginTop: '2em' }} />
        </div>
    )
}

export default Employees

