import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import EmployeeList from "./EmployeeList"
import employeesService from "../../../services/employeesService"

const EmployeeListContainer = ({ role }) => {
    const [employees, setEmployees] = useState([])

    const handleRemoveEmployee = (id) => setEmployees(R.filter((employee) => employee.id !== id, employees))

    useEffect(() => {
        const fetchData = async () => {
            const response = await employeesService.getEmployees()
            setEmployees(response)
        }
        fetchData()
    }, [])

    return (
        <EmployeeList role={role} employees={employees} handleRemoveEmployee={handleRemoveEmployee} />
    )
}

export default EmployeeListContainer

