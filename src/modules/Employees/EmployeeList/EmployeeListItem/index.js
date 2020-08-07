import React from 'react'
import EmployeeListItem from "./EmployeeListItem"

const EmployeeListItemContainer = ({ name, email, dateOfBirth, phone, salary }) => {
    return (
        <EmployeeListItem
            name={name}
            email={email}
            dateOfBirth={dateOfBirth}
            phone={phone}
            salary={salary}
        />
    )
}

export default EmployeeListItemContainer

