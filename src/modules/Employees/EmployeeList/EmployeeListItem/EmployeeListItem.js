import React  from 'react'
import * as R from 'ramda'
import {Grid, Button, makeStyles, FormControl, Typography, Input} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    text: {
        color: 'white'
    }
}))

const EmployeeListItem = ({ id, role, parameters, handleOnChange, editMode, handleOnSubmit, handleEditMode, handleOnRemove }) => {
    const classes = useStyles()
    const { firstName, lastName, email, dateOfBirth, mobilePhone, salary } = parameters
    const isAnyValueEmpty = R.any(value => !value.length, [firstName, lastName, email, dateOfBirth, mobilePhone, salary])

    return (
        <Grid data-test-id={`employees-list-item employees-list-item-${id}`} container>
            <Grid item xs align="left" className={classes.text}>
                <Typography data-test-id={`employees-list-item-${id}-first-name`}>{firstName}</Typography>
            </Grid>
            <Grid  item xs align="left" className={classes.text}>
                <Typography data-test-id={`employees-list-item-${id}-last-name`}>{lastName}</Typography>
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="email"
                            data-test-id={`employees-list-item-${id}-email-input`}
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={email}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    : <Typography data-test-id={`employees-list-item-${id}-email`}>{email}</Typography>
                }
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                <Typography data-test-id={`employees-list-item-${id}-date-of-birth`}>{dateOfBirth}</Typography>
            </Grid>
            <Grid item xs align="left" className={classes.text}>
                {editMode
                    ? <FormControl  style={{ paddingRight: '38px' }}>
                        <Input
                            name="mobilePhone"
                            data-test-id={`employees-list-item-${id}-mobile-phone-input`}
                            inputProps={{ style: { paddingTop: 0 } }}
                            value={mobilePhone}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    : <Typography data-test-id={`employees-list-item-${id}-mobile-phone`}>{mobilePhone}</Typography>
                }
            </Grid>
            { role !== 'user' &&
            <>
                <Grid item xs align="left" className={classes.text}>
                    {editMode && role === 'admin'
                        ? <FormControl  style={{ paddingRight: '38px' }}>
                            <Input
                                name="salary"
                                data-test-id={`employees-list-item-${id}-salary-input`}
                                inputProps={{ style: { paddingTop: 0 } }}
                                value={salary}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        : <Typography data-test-id={`employees-list-item-${id}-salary`}>{salary}€</Typography>
                    }
                </Grid>

                <Grid item xs align="left" className={classes.text}>
                    <Button
                        data-test-id={`employees-list-item-${id}-${editMode ? 'submit' : 'edit'}`}
                        variant="outlined"
                        style={{ height: '1.5em', width: '4em' }}
                        onClick={editMode ? handleOnSubmit : handleEditMode}
                        disabled={isAnyValueEmpty}
                    >
                        {editMode ? 'Submit' : 'Edit'}
                    </Button>
                    {role === 'admin' &&
                    <Button
                        data-test-id={`employees-list-item-${id}-remove`}
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
