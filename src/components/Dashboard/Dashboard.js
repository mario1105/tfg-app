import React from 'react'
import {
    Typography, makeStyles, Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dashboardBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em 40em 10em 40em',
    }
}))



const Dashboard = ({ user, handleNextRoute }) => {
    const { role, name } = user
    const registerDisabled = !(role === 'admin')
    const classes = useStyles()

    return (
        <div className={classes.dashboardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="primary" variant={'h5'} style={{marginBottom: '2em'}}>Welcome {name}!</Typography>
                <Button
                    variant="contained"
                    color="red"
                    onClick={()=> handleNextRoute('login')}
                    style={{ height: '3em', backgroundColor: 'orange'}}
                >
                    Logout
                </Button>
            </div>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={()=> handleNextRoute('employees')}
                style={{ marginBottom: '2em' }}
            >
                Employee list
            </Button>
            <Button
                fullWidth
                disabled={registerDisabled}
                variant="contained"
                color="primary"
                onClick={()=> handleNextRoute('register')}
            >
                Register
            </Button>
        </div>
    )
}

export default Dashboard
