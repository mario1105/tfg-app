import React  from 'react'
import * as R from 'ramda'
import {Grid, Button, makeStyles, FormControl, Typography, Input} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    text: {
        color: 'white'
    }
}))

const EmployeeListItem = ({ role, parameters, handleOnChange, editMode, handleOnSubmit, handleEditMode, handleOnRemove }) => {
    const classes = useStyles()
    const { firstName, lastName, email, dateOfBirth, mobilePhone, salary } = parameters
    const isAnyValueEmpty = R.any(value => !value.length, [firstName, lastName, email, dateOfBirth, mobilePhone, salary])

    return (
        <Grid container>
            <Grid item xs align="left" className={classes.text}>
                <Typography>{firstName}</Typography>
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                <Typography>{lastName}</Typography>
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
                <Typography>{dateOfBirth}</Typography>
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
            { role !== 'user' &&
            <>
                <Grid item xs align="left" className={classes.text}>
                    {editMode && role === 'admin'
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
                        style={{ height: '1.5em', width: '4em' }}
                        onClick={editMode ? handleOnSubmit : handleEditMode}
                        disabled={isAnyValueEmpty}
                    >
                        {editMode ? 'Submit' : 'Edit'}
                    </Button>
                    {role === 'admin' &&
                    <Button
                        variant="outlined"
                        style={{ height: '1.5em', width: '5em', marginLeft: '1em', color: 'orange' }}
                        onClick={handleOnRemove}
                    >
                        Remove
                    </Button>
                    }
                </Grid>
            </>
            }
        </Grid>
    )
}

export default EmployeeListItem
