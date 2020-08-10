import React, { useState } from 'react';
import * as R from 'ramda';
import request from 'utils/request';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import validation from './validation';
import getOptions from './service/getOptions';
import apiEndpointBase from './service/apiEndpointBase';

const RegisterFormContainer = ({ userEmail }) => {
  const [fields, setFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobilePhone: '+44',
    day: '',
    month: '',
    year: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
    mobilePhone: false,
    day: false,
    month: false,
    year: false
  });

  const [loading, setLoading] = useState(false);
  const [confirmationView, setConfirmationView] = useState(false);
  const [requestError, setRequestError] = useState(false);


  const handleFieldsChange = (prop) => (event) => {
    if (prop === 'mobilePhone' && !event.target.value.startsWith('+44')) {
      setFields({ ...fields, mobilePhone: '+44' });
    } else {
      setFields({ ...fields, [prop]: event.target.value });
    }
  };

  const handleFieldsErrors = (prop) => {
    setErrors({ ...errors, [prop]: validation[prop](fields[prop]) });
  };

  const resetErrors = (prop) => {
    setErrors({ ...errors, [prop]: false });
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    setRequestError(false);

    setLoading(true);
    await request(`${apiEndpointBase}/register`, getOptions(fields))
      .then(() => {
        setLoading(false);
        setConfirmationView(true);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          error.response.json().then((data) => {
            const validations = data.errors.map(({ meta }) => meta.validation);
            const emailAlreadyExists = R.flatten(validations).find(({ failed }) => failed.Okta === 'An object with this field already exists in the current organization');
            // eslint-disable-next-line no-unused-expressions
            emailAlreadyExists ? setRequestError('This email address already exists') : setRequestError('There was an error, please try again');
          });
        } else setRequestError('There was an error, please try again');
      });
  };

  return (
    <RegisterForm
      userEmail={userEmail}
      fields={fields}
      errors={errors}
      loading={loading}
      confirmationView={confirmationView}
      requestError={requestError}
      handleFieldsChange={handleFieldsChange}
      handleFieldsErrors={handleFieldsErrors}
      resetErrors={resetErrors}
      submitRegisterForm={submitRegisterForm}
    />
  );
};

RegisterFormContainer.propTypes = {
  userEmail: PropTypes.string,
};
export default RegisterFormContainer;
