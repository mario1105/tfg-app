import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'
import Login from "./Login";

const mockData = {
    users: [{
        email: 'test@test.com',
        password: 'test123',
        role: 'administrator',
        name: 'Mario'
    },
        {
            email: 'test@test.com',
            password: 'test123',
            role: 'administrator',
            name: 'Mario'
        },
        {
            email: 'test@test.com',
            password: 'test123',
            role: 'administrator',
            name: 'Mario'
        }]
}
const LoginContainer = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const handleEmailChange = e => setEmail(e.currentTarget.value)
    const handlePasswordChange = e => setPassword(e.currentTarget.value)

    const getCurrentUser = users => {
        let currentUser
        users.forEach(user => {
            if(!currentUser){
                if (user.email === email && user.password === password)
                    currentUser = {...currentUser, email, password, ...user}
                else
                    currentUser = null
            }
        })
        return currentUser
    }

    const handleOnSubmit = () => {
        setCurrentUser(getCurrentUser(mockData.users))
    }

    return (
        currentUser?.email
            ? <Redirect to={{ pathname: '/dashboard', state: R.dissoc('password', currentUser) }} />
            : <Login
                email={email}
                password={password}
                currentUser={currentUser}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleOnSubmit={handleOnSubmit}
            />
    )
}

export default LoginContainer
