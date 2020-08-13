import React, { useState } from 'react'
import * as R from 'ramda'
import RegisterForm from './RegisterForm'
import validation from './validation'
import employeesService from "../../services/employeesService"

const RegisterFormContainer = ({location}) => {
    const user = location.state

    const [fields, setFields] = useState({
        email: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        day: '',
        month: '',
        year: '',
        salary: ''
    })

    const [errors, setErrors] = useState({
        email: false,
        firstName: false,
        lastName: false,
        mobilePhone: false,
        day: false,
        month: false,
        year: false,
        salary: false
    })

    const [loading, setLoading] = useState(false)
    const [confirmationView, setConfirmationView] = useState(false)

    const handleFieldsChange = (prop) => (event) => setFields({ ...fields, [prop]: event.target.value })

    const handleFieldsErrors = (prop) => setErrors({ ...errors, [prop]: validation[prop](fields[prop]) })

    const resetErrors = (prop) => setErrors({ ...errors, [prop]: false })

    const submitRegisterForm = async (e) => {
        e.preventDefault()

        setLoading(true)
        await employeesService.registerEmployee({
            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            dateOfBirth: R.join('/', [fields.day, fields.month, fields.year]),
            mobilePhone: fields.mobilePhone,
            salary: fields.salary
        })
        setLoading(false)
        setConfirmationView(true)
    }

    return (
        <RegisterForm
            user={user}
            fields={fields}
            errors={errors}
            loading={loading}
            confirmationView={confirmationView}
            handleFieldsChange={handleFieldsChange}
            handleFieldsErrors={handleFieldsErrors}
            resetErrors={resetErrors}
            submitRegisterForm={submitRegisterForm}
        />
    )
}

export default RegisterFormContainer
