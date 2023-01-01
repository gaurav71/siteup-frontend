import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import ApolloProvider from './Apollo'
import Login from './Auth/login'
import styled from 'styled-components'
import AuthProvider from './Auth/AuthProvider'
import PrivateRoute from './Auth/PrivateRoute'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Profile from './Profile'
import SignUp from './Auth/signup'
import VerifyUser from './Auth/VerifyUser'

const Wrapper = styled.div`
  height: 100%;
`

export const paths = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  VERIFY_USER: '/verify-user'
})

const routes = (
  <Switch>
    <Route exact path={paths.LOGIN}>
      <Login />
    </Route>
    <Route exact path={paths.SIGNUP}>
      <SignUp />
    </Route>
    <Route exact path={paths.VERIFY_USER}>
      <VerifyUser />
    </Route>
    <PrivateRoute exact path={paths.DASHBOARD}>
      <Dashboard />
    </PrivateRoute>
    <PrivateRoute exact path={paths.PROFILE}>
      <Profile />
    </PrivateRoute>
    <Redirect from={paths.HOME} to={paths.DASHBOARD} />
  </Switch>
)

const App: React.FC = () => (
  <ApolloProvider>
    <AuthProvider>
      <Router>
        <Wrapper>
          <Navbar />
          {routes}
        </Wrapper>
      </Router>
    </AuthProvider>
  </ApolloProvider>
)

export default App
