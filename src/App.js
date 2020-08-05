import React from 'react'
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import RegisterForm from "./components/RegisterForm"
import EmployeeList from "./components/EmployeeList"
import { theme } from './theme'
import { ThemeProvider } from '@material-ui/core'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

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
