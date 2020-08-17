import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import EmployeeList from "./EmployeeList"

const EmployeeListContainer = ({ role }) => {
    const [employees, setEmployees] = useState([])

    const handleRemoveEmployee = (id) => setEmployees(R.filter((employee) => employee.id !== id, employees))

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/employees', { method: 'GET' }
            ).then(response => response.json())
            setEmployees(response)
        }
        fetchData()
    }, [])

    return (
        <EmployeeList role={role} employees={employees} handleRemoveEmployee={handleRemoveEmployee} />
    )
}

export default EmployeeListContainer

