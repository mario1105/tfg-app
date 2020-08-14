import { defaultHeaders, apiEndpoint } from "../../utils/constants"

const headers = {
    ...defaultHeaders,
}

const usersService = {
    getUsers: async () => {
        const options = {
            headers,
            method: 'GET'
        }
        return await fetch(`${apiEndpoint}/users`, options).then(response => response.json())
    }
}

export default usersService
