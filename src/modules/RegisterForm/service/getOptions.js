import * as R from 'ramda';
import { defaultHeaders } from 'utils/request';

const getOptions = ({
  email, firstName, lastName, mobilePhone, day, month, year
}, headers = defaultHeaders) => ({
  headers,
  method: 'POST',
  body: JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email,
    date_of_birth: R.values({ year, month, day }).join('-'),
    mobile_number: mobilePhone,
  }),
});

export default getOptions;
