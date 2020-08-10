import React, {useState} from 'react'
import EmployeeListItem from "./EmployeeListItem"

const EmployeeListItemContainer = ({ name, email, dateOfBirth, phone, salary }) => {
    const [editMode, setEditMode] = useState(false)

    const handleEditMode = () => setEditMode(!editMode)

    return (
        <EmployeeListItem
            name={name}
            email={email}
            dateOfBirth={dateOfBirth}
            phone={phone}
            salary={salary}
            editMode={editMode}
            handleEditMode={handleEditMode}
        />
    )
}

export default EmployeeListItemContainer

