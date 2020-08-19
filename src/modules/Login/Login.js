import React from 'react'
import {
    Typography, makeStyles, Input, FormControl, InputLabel, FormHelperText, Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    loginBox: {
        backgroundColor: '#213b58',
        padding: '56px',
        borderRadius: 10,
        margin: '10em 40em 10em 40em',
        maxHeight: '176px'
    }
}))

const Login = ({email, password, currentUser, handleEmailChange, handlePasswordChange, handleOnSubmit}) => {
    const classes = useStyles()

    return (
        <div className={classes.loginBox}>
            <Typography data-test-id="login-form-header" color="primary" variant={'h5'} style={{marginBottom: '2em'}}>Login</Typography>
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
                        />
                        {!currentUser && <FormHelperText data-test-id="login-form-error">Email and/or password does not match</FormHelperText>}
                    </FormControl>
                </form>
                <Button
                    data-test-id="login-form-sign-in-button"
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
