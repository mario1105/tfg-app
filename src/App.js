import React from 'react'
import Login from "./modules/Login"
import Dashboard from "./modules/Dashboard"
import RegisterForm from "./modules/RegisterForm"
import EmployeeList from "./modules/Employees"
import { theme } from './theme'
import { ThemeProvider } from '@material-ui/core'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import * as R from "ramda"

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route
                path="/"
                exact
                component={() => <Redirect to={{ pathname: '/login' }} />}
            />
            <Route
                path="/login"
                component={Login}
            />
            <Route
                path="/dashboard"
                exact
                component={Dashboard}
            />
            <Route
                path="/register"
                exact
                component={RegisterForm}
            />
            <Route
                path="/employees"
                exact
                component={EmployeeList}
            />
            <Route
                path="/testing-bypass-dashboard/:role"
                exact
                component={({match}) => <Redirect to={{ pathname: '/dashboard', state: {name: 'Test', role: match.params.role} }} />}
            />
            <Route
                path="/testing-bypass-employees/:role"
                exact
                component={({match}) => <Redirect to={{ pathname: '/employees', state: {name: 'Test', role: match.params.role} }} />}
            />
            <Route
                path="/testing-bypass-register/:role"
                exact
                component={({match}) => <Redirect to={{ pathname: '/register', state: {name: 'Test', role: match.params.role} }} />}
            />
        </Switch>
      </Router>
  )
}

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
        )
}

export default App;
