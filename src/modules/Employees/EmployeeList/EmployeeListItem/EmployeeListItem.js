import React  from 'react'
import * as R from 'ramda'
import {Grid, Button, makeStyles, FormControl, Typography, Input} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    text: {
        color: 'white'
    }
}))

const EmployeeListItem = ({ name, email, dateOfBirth, phone, salary, editMode, handleEditMode }) => {
    const classes = useStyles()
    const isAnyValueEmpty = R.any(value => !value.length, [name, email, dateOfBirth, phone, salary])

    return (
        <Grid container>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            data-test-id="employee-list-item-name"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={name}
                            disabled={false}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{name}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            data-test-id="employee-list-item-email"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={email}
                            disabled={false}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{email}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            data-test-id="employee-list-item-dateOfBirth"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={dateOfBirth}
                            disabled={false}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{dateOfBirth}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            data-test-id="employee-list-item-phone"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={phone}
                            disabled={false}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{phone}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            data-test-id="employee-list-item-salary"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={salary}
                            disabled={false}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{salary}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                <Button
                    variant="outlined"
                    style={{ height: '1.5em' }}
                    onClick={handleEditMode}
                    disabled={isAnyValueEmpty}
                >
                    {editMode ? 'Submit' : 'Edit'}
                </Button>
                <Button
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
