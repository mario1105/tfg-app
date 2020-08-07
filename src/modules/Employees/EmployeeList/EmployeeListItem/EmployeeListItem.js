import React  from 'react'
import {Grid, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    text: {
        color: 'white'
    }
}))

const EmployeeListItem = ({ name, email, dateOfBirth, phone, salary }) => {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs align="left" className={classes.text}>
                {name}
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {email}
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {dateOfBirth}
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {phone}
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {salary}
            </Grid>
        </Grid>
    )
}

export default EmployeeListItem
