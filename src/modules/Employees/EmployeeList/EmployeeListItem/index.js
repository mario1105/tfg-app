import React, {useEffect, useState} from 'react'
import EmployeeListItem from "./EmployeeListItem"
import employeesService from "../../../../services/employeesService"

const EmployeeListItemContainer = ({ id, role, firstName, lastName, email, dateOfBirth, mobilePhone, salary, handleRemoveEmployee }) => {
    const [parameters, setParameters] = useState({firstName, lastName, email, dateOfBirth, mobilePhone, salary})
    const [editMode, setEditMode] = useState(false)

    const handleOnChange = e => {
        setParameters({
            ...parameters,
            [e.target.name]: e.target.value
        })
    }

    const handleEditMode = () => setEditMode(!editMode)

    const handleOnSubmit = async () => {
       await employeesService.editEmployee({parameters, id})
        handleEditMode()
    }

    const handleOnRemove = async () => {
        await employeesService.removeEmployee({id})
        handleRemoveEmployee(id)
    }

    return (
        <EmployeeListItem
            id={id}
            role={role}
            parameters={parameters}
            editMode={editMode}
            handleOnChange={handleOnChange}
            handleEditMode={handleEditMode}
            handleOnSubmit={handleOnSubmit}
            handleOnRemove={handleOnRemove}
        />
    )
}

export default EmployeeListItemContainer

