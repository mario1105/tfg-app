import React  from 'react'
import {Grid, Button, makeStyles} from '@material-ui/core'

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
            <Grid item xs align="left" className={classes.text}>
                <Button
                    color="blueText"
                    variant="outlined"
                    style={{ height: '1.5em' }}
                >
                    Edit
                </Button>
                <Button
                    color="blueText"
                    variant="outlined"
                    style={{ height: '1.5em', marginLeft: '1em', color: 'orange' }}
                >
                    Remove
                </Button>
            </Grid>
        </Grid>
    )
}

export default EmployeeListItem
