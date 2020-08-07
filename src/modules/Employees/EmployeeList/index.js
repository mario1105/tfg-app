import React from 'react'
import EmployeeList from "./EmployeeList"

const EmployeeListContainer = ( ) => {
    const employeeList = [
        {
            name: 'Mario Jimenez',
            email: 'mario@gmail.com',
            dateOfBirth: '11/05/1995',
            phone: '666555444',
            salary: '35.000€'
        },
        {
            name: 'Daniel Gomez',
            email: 'daniel@gmail.com',
            dateOfBirth: '19/11/1992',
            phone: '612345632',
            salary: '42.000€'
        },
        {
            name: 'Carlos Lopez',
            email: 'carlos@gmail.com',
            dateOfBirth: '25/02/1996',
            phone: '692746285',
            salary: '30.000€'
        },
    ]

    return (
        <EmployeeList employeeList={employeeList} />
    )
}

export default EmployeeListContainer

