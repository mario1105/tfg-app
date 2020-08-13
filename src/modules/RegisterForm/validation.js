const validation = {
  email: (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 'Please enter a valid email',
  firstName: (firstName) => firstName.length < 2 && 'First name must be at least 2 characters long',
  lastName: (lastName) => lastName.length < 2 && 'Last name must be at least 2 characters long',
  mobilePhone: (mobilePhone) => (
    (!/^[0-9]+$/.test(mobilePhone)
    || !(mobilePhone.startsWith('6') && mobilePhone.length === 9))
    && 'Please enter a valid phone number.'),
  day: (day) => day.length !== 2 || day > 31 || day === '00',
  month: (month) => month.length !== 2 || month > 12 || month === '00',
  year: (year) => year.length !== 4 || year < 1900 || year === '0000',
  salary: (salary) => ((!/^[0-9]+$/.test(salary)) && 'Salary must be a number')
}

export default validation;
