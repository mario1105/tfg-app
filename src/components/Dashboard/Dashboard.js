import React from 'react'
import {
    Typography, makeStyles, Input, FormControl, InputLabel, FormHelperText, Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dashboardBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em 40em 10em 40em',
    }
}))

const Dashboard = ({ user }) => {
    const { email, role, name } = user
    const classes = useStyles()

    return (
        <div className={classes.dashboardBox}>
            <Typography color="primary" variant={'h5'} style={{marginBottom: '2em'}}>Welcome {name}!</Typography>
        </div>
    )
}

export default Dashboard
