import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'
import usersService from "../../services/usersService"
import Login from "./Login";

const LoginContainer = () => {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    useEffect(() => {
        const fetchData = async () => {
            const response = await usersService.getUsers()
            setUsers(response)
        }
        fetchData()
    }, [])

    const getCurrentUser = users => {
        let currentUser = null
        users.forEach(user => {
            if(!currentUser){
                if (user.email === email && user.password === password)
                    currentUser = {...currentUser, email, password, ...user}
            }
        })
        return currentUser
    }

    const handleOnSubmit = () => {
        setCurrentUser(getCurrentUser(users))
    }

    return (
        currentUser?.email
            ? <Redirect from={'/'} to={{ pathname: '/dashboard', state: R.dissoc('password', currentUser) }} />
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
