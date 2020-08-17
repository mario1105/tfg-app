import React, {useEffect, useState} from 'react'
import EmployeeListItem from "./EmployeeListItem"

const EmployeeListItemContainer = ({ id, role, firstName, lastName, email, dateOfBirth, mobilePhone, salary, handleRemoveEmployee }) => {
    const [parameters, setParameters] = useState({firstName, lastName, email, dateOfBirth, mobilePhone, salary})
    const [editMode, setEditMode] = useState(false)

    const handleOnChange = e => {
        setParameters({
            ...parameters,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleEditMode = () => setEditMode(!editMode)

    const handleOnSubmit = async () => {
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                ...parameters
            })
        }

        await fetch(`http://localhost:3001/employees/${id}`, options)
        handleEditMode()
    }

    const handleOnRemove = async () => {
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        }

        await fetch(`http://localhost:3001/employees/${id}`, options)
        handleRemoveEmployee(id)
    }

    return (
        <EmployeeListItem
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

