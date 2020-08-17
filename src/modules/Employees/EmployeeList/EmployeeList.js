import React from 'react'
import TableDataRowWrapper from "../../../components/TableDataRowWrapper"
import TableRowHeaders from "../../../components/TableRowHeaders"
import EmployeeListItemContainer from "./EmployeeListItem"

const EmployeeList = ({ role, employees, handleRemoveEmployee }) => {
    const headers = ['First Name', 'Last Name', 'Email', 'Date of Birth', 'Mobile phone']
    return (
        <>
            <TableRowHeaders
                headerList={ role === 'user' ? headers : [...headers, 'Salary', 'Actions'] }
            />
            {employees.map(
                ({ id, firstName, lastName, email, dateOfBirth, mobilePhone, salary }) => (
                    <TableDataRowWrapper key={id}>
                        <EmployeeListItemContainer
                            id={id}
                            role={role}
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            dateOfBirth={dateOfBirth}
                            mobilePhone={mobilePhone}
                            salary={salary}
                            handleRemoveEmployee={handleRemoveEmployee}
                        />
                    </TableDataRowWrapper>
                )
            )}
        </>
    )
}

export default EmployeeList

