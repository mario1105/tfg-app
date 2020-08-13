import React, { useState } from 'react'
import * as R from 'ramda'
import RegisterForm from './RegisterForm'
import validation from './validation'

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
    const [requestError, setRequestError] = useState(false)


    const handleFieldsChange = (prop) => (event) => setFields({ ...fields, [prop]: event.target.value })

    const handleFieldsErrors = (prop) => setErrors({ ...errors, [prop]: validation[prop](fields[prop]) })

    const resetErrors = (prop) => setErrors({ ...errors, [prop]: false })

    const submitRegisterForm = async (e) => {
        e.preventDefault()
        setRequestError(false)

        setLoading(true)
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                firstName: fields.firstName,
                lastName: fields.lastName,
                email: fields.email,
                dateOfBirth: R.join('/', [fields.day, fields.month, fields.year]),
                mobilePhone: fields.mobilePhone,
                salary: fields.salary
            })
        }

        await fetch(`http://localhost:3001/employees`, options)
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
            requestError={requestError}
            handleFieldsChange={handleFieldsChange}
            handleFieldsErrors={handleFieldsErrors}
            resetErrors={resetErrors}
            submitRegisterForm={submitRegisterForm}
        />
    )
}

export default RegisterFormContainer
