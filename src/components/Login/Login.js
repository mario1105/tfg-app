import React from 'react'
import {
    Typography, Grid, makeStyles, Input, FormControl, InputLabel, FormHelperText, Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    loginBox: {
        backgroundColor: theme.app.background['300'],
        padding: theme.spacing(7),
        borderRadius: 10,
        margin: '10em 40em 10em 40em',
        maxHeight: '176px'
    }
}))

const Login = ({email, password, currentUser, handleEmailChange, handlePasswordChange, handleOnSubmit}) => {
    const classes = useStyles()

    return (
        <div className={classes.loginBox}>
            <Typography color="primary" variant={'h5'} style={{marginBottom: '2em'}}>Login</Typography>
            <div style={{ display: 'flex' }}>
                <form data-test-id="login-form" noValidate onSubmit={() => null}>
                    <FormControl error={!currentUser}  style={{ paddingRight: '38px' }}>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input
                            data-test-id="login-form-email-input"
                            autoComplete="off"
                            value={email}
                            disabled={false}
                            onChange={handleEmailChange}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                    </FormControl>
                    <FormControl error={!currentUser}  style={{ paddingRight: '38px' }}>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input
                            type="password"
                            data-test-id="login-form-password-input"
                            autoComplete="off"
                            value={password}
                            disabled={false}
                            onChange={handlePasswordChange}
                            onBlur={() => null}
                            onFocus={() => null}
                        />
                        {!currentUser && <FormHelperText data-test-id="login-form-error">Email and/or password does not match</FormHelperText>}
                    </FormControl>
                </form>
                <Button
                    fullWidth
                    disabled={!email.length || !password.length}
                    variant="contained"
                    color="primary"
                    onClick={handleOnSubmit}
                    style={{ maxHeight: '96px' }}
                >
                    Sign in
                </Button>
            </div>
        </div>
    )
}

export default Login
