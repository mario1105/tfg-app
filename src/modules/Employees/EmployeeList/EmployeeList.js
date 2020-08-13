import React from 'react'
import TableDataRowWrapper from "../../../components/TableDataRowWrapper"
import TableRowHeaders from "../../../components/TableRowHeaders"
import EmployeeListItemContainer from "./EmployeeListItem"

const EmployeeList = ({ employees, handleRemoveEmployee }) => {
    return (
        <>
            <TableRowHeaders
                headerList={['First Name', 'Last Name', 'Email', 'Date of Birth', 'Mobile phone', 'Salary', 'Actions']}
            />
            {employees.map(
                ({ id, firstName, lastName, email, dateOfBirth, mobilePhone, salary }) => (
                    <TableDataRowWrapper key={id}>
                        <EmployeeListItemContainer
                            id={id}
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

