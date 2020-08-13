import React from 'react';
import * as R from 'ramda';
import {
  Grid, makeStyles, Input, FormControl, InputLabel, FormHelperText, Typography, Button
} from '@material-ui/core';
import InputExpansion from './InputExpansion';
import InputDate from './InputDate';
import ReturnButton from "../../components/ReturnButton"

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.app.background['300'],
    borderRadius: '20px',
    maxWidth: '25em',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em'
  },
  formControl: {
    flex: '1',
    paddingBottom: '1em'
  },
}));

const RegisterForm = ({
                        user, fields, errors, loading, confirmationView, requestError, handleFieldsChange, handleFieldsErrors, resetErrors, submitRegisterForm
}) => {
  const validationError = errors.email || errors.firstName || errors.lastName || errors.mobilePhone || errors.day || errors.month || errors.year;
  const emptyField = R.any((value) => value.length === 0)(R.values(fields));

  const classes = useStyles();
  return (
    <Grid className={classes.registerFormBox} container style={{ marginTop: '2em' }} alignItems="center" direction="column">
      <Grid item className={classes.card} style={{ marginBottom: '1em' }}>
          {confirmationView
            ? (
              <Grid data-test-id="registration-completed-view" style={{ margin: '1em', display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ color: 'white' }}>Registration successfully completed</Typography>
                <ReturnButton previousRoute="dashboard" user={user} style={{ marginTop: '2em' }} />
              </Grid>
            )
            : (
              <form data-test-id="registration-form" noValidate className={classes.form} onSubmit={submitRegisterForm}>
                <FormControl error={!!errors.email} className={classes.formControl} style={{ paddingRight: '38px' }}>
                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input
                    data-test-id="registration-form-email-input"
                    autoComplete="off"
                    value={fields.email}
                    onChange={handleFieldsChange('email')}
                    onBlur={() => handleFieldsErrors('email')}
                    onFocus={() => resetErrors('email')}
                  />
                  {!!errors.email && <FormHelperText data-test-id="registration-form-email-error">{errors.email}</FormHelperText>}
                </FormControl>

                <FormControl error={!!errors.firstName} className={classes.formControl} style={{ paddingRight: '38px' }}>
                  <InputLabel htmlFor="my-input">First name</InputLabel>
                  <Input
                    data-test-id="registration-form-first-name-input"
                    autoComplete="off"
                    value={fields.firstName}
                    onChange={handleFieldsChange('firstName')}
                    onBlur={() => handleFieldsErrors('firstName')}
                    onFocus={() => resetErrors('firstName')}
                  />
                  {!!errors.firstName && <FormHelperText data-test-id="registration-form-first-name-error">{errors.firstName}</FormHelperText>}
                </FormControl>

                <FormControl error={!!errors.lastName} className={classes.formControl} style={{ paddingRight: '38px' }}>
                  <InputLabel htmlFor="my-input">Last name</InputLabel>
                  <Input
                    data-test-id="registration-form-last-name-input"
                    autoComplete="off"
                    value={fields.lastName}
                    onChange={handleFieldsChange('lastName')}
                    onBlur={() => handleFieldsErrors('lastName')}
                    onFocus={() => resetErrors('lastName')}
                  />
                  {!!errors.lastName && <FormHelperText data-test-id="registration-form-last-name-error">{errors.lastName}</FormHelperText>}
                </FormControl>

                <InputExpansion
                  data-test-id="registration-form-mobile-phone-expansion-field"
                  content={(
                    <Typography variant="subtitle2" component={'span'}>
                      We require a Spanish phone number for additional contact details
                    </Typography>
                  )}
                >
                  <FormControl
                    data-test-id="registration-form-mobile-phone-field"
                    error={!!errors.mobilePhone}
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="my-input">Mobile phone</InputLabel>
                    <Input
                      data-test-id="registration-form-mobile-phone-input"
                      id={'mobile-phone-input'}
                      autoComplete="off"
                      value={fields.mobilePhone}
                      onChange={handleFieldsChange('mobilePhone')}
                      onBlur={() => handleFieldsErrors('mobilePhone')}
                      onFocus={() => resetErrors('mobilePhone')}
                    />
                    {!!errors.mobilePhone && <FormHelperText data-test-id="registration-form-mobile-phone-error">{errors.mobilePhone}</FormHelperText>}
                  </FormControl>
                </InputExpansion>
                <InputDate
                  date={{ day: fields.day, month: fields.month, year: fields.year }}
                  errors={{ day: errors.day, month: errors.month, year: errors.year }}
                  handleFieldsChange={handleFieldsChange}
                  handleFieldsErrors={handleFieldsErrors}
                  resetErrors={resetErrors}
                  style={{ paddingRight: '38px' }}
                />

                <FormControl error={!!errors.salary} className={classes.formControl} style={{ paddingRight: '38px' }}>
                  <InputLabel htmlFor="my-input">Salary</InputLabel>
                  <Input
                      data-test-id="registration-form-salary-input"
                      autoComplete="off"
                      value={fields.salary}
                      onChange={handleFieldsChange('salary')}
                      onBlur={() => handleFieldsErrors('salary')}
                      onFocus={() => resetErrors('salary')}
                  />
                  {!!errors.salary && <FormHelperText data-test-id="registration-form-salary-error">{errors.salary}</FormHelperText>}
                </FormControl>
                <Button
                  data-test-id="registration-form-register-button"
                  disabled={!!(loading || validationError || emptyField)}
                  style={{ marginTop: '3em' }}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  fullWidth
                  onClick={submitRegisterForm}
                >Register
                </Button>
                {requestError
                && (
                  <Typography
                    data-test-id="registration-form-submit-error"
                    style={{ display: 'flex', alignSelf: 'center' }}
                    color="error"
                  >{requestError}
                  </Typography>
                )}
                <ReturnButton previousRoute="dashboard" user={user} style={{ marginTop: '2em' }} />
              </form>
            )
          }
      </Grid>
    </Grid>
  )
}

export default RegisterForm;
