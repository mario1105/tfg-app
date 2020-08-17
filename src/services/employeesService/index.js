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
  editEmployee: async ({ parameters, id }) => {
    const headers = {
      ...defaultHeaders,
    }
    const optionsPatch = {
      headers,
      method: 'PATCH',
      body: JSON.stringify({
        ...parameters
      })
    }

    await fetch(`${apiEndpoint}/employees/${id}`, optionsPatch)
  },
  removeEmployee: async ({ id }) => {
    const headers = {
      ...defaultHeaders,
    }
    const optionsDelete= {
      headers,
      method: 'DELETE',
    }

    await fetch(`${apiEndpoint}/employees/${id}`, optionsDelete)
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
