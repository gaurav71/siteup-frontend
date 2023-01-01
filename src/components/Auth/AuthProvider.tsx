import React, { useContext, createContext, useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
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
  useVerifyUserMutation
} from '../../generated/graphql'

export interface AuthContextType {
  user: Maybe<User>
  login: (data: LoginQueryVariables) => void
  signup: (data: CreateUserMutationVariables) => void
  verify: (token: string) => void
  logout: () => void
  loginLoader: boolean
  signUpLoader: boolean
  signUpSuccess: boolean
  checkUserLoader: boolean
  logoutLoader: boolean
  verifyUserLoader: boolean
  verifyUserSuccess: boolean
  verifyUserError: boolean
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
    { loading: signUpLoader, data: signUpData },
  ] = useCreateUserMutation()
  
  const [
    verifyUserMutation,
    { loading: verifyUserLoader, data: verifyUserData, error: verifyUserError },
  ] = useVerifyUserMutation()
  
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
    setUser(verifyUserData && verifyUserData.verifyUser)
  }, [verifyUserData])

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

  const verify = (token: string) => {
    verifyUserMutation({
      variables: { token }
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
    verify,
    logout,
    loginLoader,
    signUpLoader,
    checkUserLoader,
    logoutLoader,
    signUpSuccess: !!(signUpData),
    verifyUserLoader,
    verifyUserSuccess: !!(verifyUserData),
    verifyUserError: !!(verifyUserError)
  }

  if (!firstCheck || checkUserLoader || logoutLoader) {
    return <Loader darkenBackground />
  }

  return <Provider value={contextValue}>{children}</Provider>
}

export const useAuthContext = (): AuthContextType | null =>
  useContext(authContext)

export default AuthProvider
