import React, { useContext, createContext, useState, useEffect } from 'react'
import { Maybe } from 'graphql/jsutils/Maybe'
import Loader from '../common/Loader'

import {
  CreateUserMutationVariables,
  LoginQueryVariables,
  useCreateUserMutation,
  useLoginLazyQuery,
  useLogoutMutation,
  User,
  useUserQuery,
} from '../../generated/graphql'
import { useApolloClient } from '@apollo/client'

export interface AuthContextType {
  user: Maybe<User>
  login: (data: LoginQueryVariables) => void
  signup: (data: CreateUserMutationVariables) => void
  logout: () => void
  loginLoader: boolean
  signUpLoader: boolean
  checkUserLoader: boolean
  logoutLoader: boolean
}

const authContext = createContext<AuthContextType | null>(null)

const Provider = authContext.Provider

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Maybe<User>>(null)
  const [firstCheck, setFirstCheck] = useState(false)
  const client = useApolloClient()

  const {
    loading: checkUserLoader,
    data: checkUserData,
    error: checkUserError,
  } = useUserQuery()
  const [
    loginQuery,
    { loading: loginLoader, data: loginData },
  ] = useLoginLazyQuery()
  const [
    createUserMutation,
    { loading: signUpLoader },
  ] = useCreateUserMutation()
  const [
    logoutMutation,
    { loading: logoutLoader, data: logoutData },
  ] = useLogoutMutation()

  useEffect(() => {
    setUser(checkUserData && checkUserData.user)
  }, [checkUserData])

  useEffect(() => {
    setUser(loginData && loginData.login)
  }, [loginData])

  useEffect(() => {
    if (logoutData && logoutData.logout) {
      setUser(null)
    }
  }, [logoutData])

  useEffect(() => {
    if (checkUserData || checkUserError) {
      setFirstCheck(true)
    }
  }, [checkUserData, checkUserError])

  const login = (data: LoginQueryVariables) => {
    loginQuery({
      variables: data,
    })
  }

  const signup = (data: CreateUserMutationVariables) => {
    createUserMutation({
      variables: data,
    })
  }

  const logout = () => {
    logoutMutation()
    client.resetStore()
  }

  const contextValue: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loginLoader,
    signUpLoader,
    checkUserLoader,
    logoutLoader,
  }

  if (!firstCheck || checkUserLoader || logoutLoader) {
    return <Loader darkenBackground />
  }

  return <Provider value={contextValue}>{children}</Provider>
}

export const useAuthContext = (): AuthContextType | null =>
  useContext(authContext)

export default AuthProvider
