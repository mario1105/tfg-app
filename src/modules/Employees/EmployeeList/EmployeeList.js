import React from 'react'
import TableDataRowWrapper from "../../../components/TableDataRowWrapper"
import TableRowHeaders from "../../../components/TableRowHeaders"
import EmployeeListItemContainer from "./EmployeeListItem"


const EmployeeList = ({ employeeList }) => {
    return (
        <>
            <TableRowHeaders
                headerList={['Name', 'Email', 'Date of Birth', 'Phone number', 'Salary', 'Actions']}
            />
            {employeeList.map(
                (
                    { name, email, dateOfBirth, phone, salary },
                    index
                ) => (
                    <TableDataRowWrapper key={index}>
                        <EmployeeListItemContainer
                            name={name}
                            email={email}
                            dateOfBirth={dateOfBirth}
                            phone={phone}
                            salary={salary}
                        />
                    </TableDataRowWrapper>
                )
            )}
        </>
    )
}

export default EmployeeList

