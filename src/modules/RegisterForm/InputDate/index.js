import React, { useEffect } from 'react';
import {
  Input, FormControl, InputLabel, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from 'components/Typography';

const useStyles = makeStyles(() => ({
  formControlContainer: {
    display: 'flex',
    marginBottom: '.5em'
  },
}));

const setFocus = (inputId) => {
  setTimeout(() => document.getElementById(inputId).focus(), 1);
};

const InputDate = ({
  date, errors, handleFieldsChange, handleFieldsErrors, resetErrors, ...props
}) => {
  const { day, month, year } = date;

  useEffect(
    () => {
      if (day.length === 2) {
        if (month.length !== 2) setFocus('month-input');
        else if (month.length === 2 && year.length !== 4) setFocus('year-input');
      } else if (day.length === 0 && month.length === 2) setFocus('year-input');
    },
    [day, month],
  );

  const classes = useStyles();

  return (
    <div>
      <div className={classes.formControlContainer}>
        <FormControl data-test-id="date-field-day-form-control" error={errors.day} {...props}>
          <InputLabel>DD</InputLabel>
          <Input
            data-test-id="date-field-day-input"
            id={'day-input'}
            type={'number'}
            className={'pureNumberInput'}
            autoComplete="off"
            value={day}
            onChange={handleFieldsChange('day')}
            onBlur={() => handleFieldsErrors('day')}
            onFocus={() => resetErrors('day')}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </FormControl>
        <FormControl data-test-id="date-field-month-form-control" error={errors.month} {...props}>
          <InputLabel>MM</InputLabel>
          <Input
            data-test-id="date-field-month-input"
            id={'month-input'}
            type={'number'}
            className={'pureNumberInput'}
            autoComplete="off"
            value={month}
            onChange={handleFieldsChange('month')}
            onBlur={() => handleFieldsErrors('month')}
            onFocus={() => resetErrors('month')}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </FormControl>
        <FormControl data-test-id="date-field-year-form-control" error={errors.year} {...props}>
          <InputLabel>YYYY</InputLabel>
          <Input
            data-test-id="date-field-year-input"
            id={'year-input'}
            type={'number'}
            className={'pureNumberInput'}
            autoComplete="off"
            value={year}
            onChange={handleFieldsChange('year')}
            onBlur={() => handleFieldsErrors('year')}
            onFocus={() => resetErrors('year')}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 4);
            }}
          />
        </FormControl>
      </div>
      <Typography variant="subtitle2" gutterBottom>
        Date of Birth
      </Typography>
    </div>

  );
};

InputDate.propTypes = {
  date: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string
  }),
  errors: PropTypes.shape({
    day: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  handleFieldsChange: PropTypes.func,
  handleFieldsErrors: PropTypes.func,
  resetErrors: PropTypes.func,
};

export default InputDate;
