import React  from 'react'
import * as R from 'ramda'
import {Grid, Button, makeStyles, FormControl, Typography, Input} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    text: {
        color: 'white'
    }
}))

const EmployeeListItem = ({ parameters, handleOnChange, editMode, handleOnSubmit, handleEditMode, handleOnRemove }) => {
    const classes = useStyles()
    const { firstName, lastName, email, dateOfBirth, mobilePhone, salary } = parameters
    const isAnyValueEmpty = R.any(value => !value.length, [firstName, lastName, email, dateOfBirth, mobilePhone, salary])

    return (
        <Grid container>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="firstName"
                            data-test-id="employee-list-item-first-name"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={firstName}
                            disabled={false}
                            onChange={handleOnChange}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{firstName}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="lastName"
                            data-test-id="employee-list-item-last-name"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={lastName}
                            disabled={false}
                            onChange={handleOnChange}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{lastName}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="email"
                            data-test-id="employee-list-item-email"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={email}
                            disabled={false}
                            onChange={handleOnChange}
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
                            name="dateOfBirth"
                            data-test-id="employee-list-item-dateOfBirth"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={dateOfBirth}
                            disabled={false}
                            onChange={handleOnChange}
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
                            name="phone"
                            data-test-id="employee-list-item-phone"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={mobilePhone}
                            disabled={false}
                            onChange={handleOnChange}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    : <Typography>{mobilePhone}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="salary"
                            data-test-id="employee-list-item-salary"
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={salary}
                            disabled={false}
                            onChange={handleOnChange}
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
                    onClick={editMode ? handleOnSubmit : handleEditMode}
                    disabled={isAnyValueEmpty}
                >
                    {editMode ? 'Submit' : 'Edit'}
                </Button>
                <Button
                    variant="outlined"
                    style={{ height: '1.5em', marginLeft: '1em', color: 'orange' }}
                    onClick={handleOnRemove}
                >
                    Remove
                </Button>
            </Grid>
        </Grid>
    )
}

export default EmployeeListItem
