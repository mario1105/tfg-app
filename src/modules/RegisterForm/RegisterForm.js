import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import {
  Grid, makeStyles, Input, FormControl, InputLabel, FormHelperText
} from '@material-ui/core';
import FlatCard from 'components/FlatCard';
import Typography from 'components/Typography';
import { useHelpInfoContext } from 'components/HelpInfoModal';
import Button from 'components/Button';
import appConfig from 'appConfig';
import StaticLink from 'components/StaticLink';
import Link from 'components/Link';
import InputExpansion from './InputExpansion';
import InputDate from './InputDate';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    maxWidth: '25em',
    margin: 'auto'
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
  userEmail, fields, errors, loading, confirmationView, requestError, handleFieldsChange, handleFieldsErrors, resetErrors, submitRegisterForm
}) => {
  const { handleOpenDialogWithTab } = useHelpInfoContext();

  const validationError = errors.email || errors.firstName || errors.lastName || errors.mobilePhone || errors.day || errors.month || errors.year;
  const emptyField = R.any((value) => value.length === 0)(R.values(fields));

  const classes = useStyles();
  return (
    <Grid container style={{ marginTop: '2em' }} alignItems="center" direction="column">
      <Grid item style={{ marginBottom: '1em' }}>
        <FlatCard className={classes.card}>
          {confirmationView
            ? (
              <Grid data-test-id="registration-completed-view" style={{ margin: '1em' }}>
                <Typography variant="h5" color="secondary" fontWeight="bold" paragraph>Registration successfully completed</Typography>
                <Typography variant="body1" paragraph>In order to start using {appConfig.appName}, you need to verify your email.</Typography>
                <Typography variant="body1" paragraph>A verification link has been sent to your email account.</Typography>
                <Typography data-test-id="registration-completed-view-email-text" variant="body1" color="primary" fontWeight="semiBold" style={{ marginTop: '1em' }}>{fields.email}</Typography>
              </Grid>
            )
            : (
              <form data-test-id="registration-form" noValidate className={classes.form} onSubmit={submitRegisterForm}>
                <FormControl error={!!errors.email} className={classes.formControl} style={{ paddingRight: '38px' }}>
                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input
                    data-test-id="registration-form-email-input"
                    autoComplete="off"
                    value={userEmail || fields.email}
                    disabled={!!userEmail}
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
                      We require your phone number as an additional form of security, if you have any questions click
                      <StaticLink data-test-id="registration-form-mobile-phone-expansion-field-here-link" style={{ display: 'inline' }} handler={() => handleOpenDialogWithTab(2)}> here</StaticLink>
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
              </form>
            )
          }
        </FlatCard>
      </Grid>
      <Grid item>
        <Link to="/login">
          Already a member? Sign in here
        </Link>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  userEmail: PropTypes.string,
  fields: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mobilePhone: PropTypes.string,
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string
  }),
  errors: PropTypes.shape({
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    lastName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    mobilePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    day: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  loading: PropTypes.bool,
  confirmationView: PropTypes.bool,
  requestError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleFieldsChange: PropTypes.func,
  handleFieldsErrors: PropTypes.func,
  resetErrors: PropTypes.func,
  submitRegisterForm: PropTypes.func,
};

export default RegisterForm;
