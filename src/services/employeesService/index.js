import { defaultHeaders, apiEndpoint } from "../../utils/constants"

const headers = {
  ...defaultHeaders,
}

const employeesService = {
  getEmployees: async () => {
    const options = {
      headers,
      method: 'GET'
    }
    return await fetch(`${apiEndpoint}/employees`, options).then(response => response.json())
  },
  registerEmployee: async ({ firstName, lastName, email, dateOfBirth, mobilePhone, salary }) => {
    const headers = {
      ...defaultHeaders,
    }

    const optionsPost = {
      headers,
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobilePhone,
        salary
      })
    }
   await fetch(`${apiEndpoint}/employees`, optionsPost).then(response => response.json())
  }
}

export default employeesService
