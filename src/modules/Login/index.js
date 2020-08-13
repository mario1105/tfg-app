import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'

import Login from "./Login";

const LoginContainer = () => {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const handleEmailChange = e => setEmail(e.currentTarget.value)
    const handlePasswordChange = e => setPassword(e.currentTarget.value)

    // const options = {
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST'
    // }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/users', { method: 'GET' }
            ).then(response => response.json())
            setUsers(response)
        }
        fetchData()
    }, [])

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
        setCurrentUser(getCurrentUser(users))
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
