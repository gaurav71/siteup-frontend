import React, { useContext, createContext, useState, useEffect } from 'react'
import { ApolloError, useApolloClient } from '@apollo/client'
import { Maybe } from 'graphql/jsutils/Maybe'
import Loader from '../common/Loader'

import {
  CreateUserMutation,
  CreateUserMutationVariables,
  LoginQuery,
  LoginQueryVariables,
  LogoutMutation,
  useCreateUserMutation,
  useLoginLazyQuery,
  useLogoutMutation,
  User,
  useUserQuery,
  useVerifyUserMutation,
  VerifyUserMutation
} from '../../generated/graphql'
import { config } from '../../config/config'

export interface AuthContextType {
  user: Maybe<User>
  login: (data: LoginQueryVariables) => void
  googleLogin: (data: Record<string, string>) => void
  signup: (data: CreateUserMutationVariables) => void
  verify: (token: string) => void
  logout: () => void
  resetCreateUser: () => void
  checkUserLoader: boolean
  signUpLoader: boolean
  signUpData: CreateUserMutation | null | undefined
  signUpError: ApolloError | undefined
  verifyUserLoader: boolean
  verifyUserData: VerifyUserMutation | null | undefined
  verifyUserError: ApolloError | undefined
  loginLoader: boolean
  loginData: LoginQuery | undefined
  loginError: ApolloError | undefined
  logoutLoader: boolean
  logoutData: LogoutMutation | null | undefined
  logoutError: ApolloError | undefined
}

const authContext = createContext<AuthContextType | null>(null)

const Provider = authContext.Provider

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Maybe<User>>(null)
  const [firstCheck, setFirstCheck] = useState(false)
  const [loginError, setLoginError] = useState<any>(null)
  const client = useApolloClient()

  const {
    loading: checkUserLoader, data: checkUserData, error: checkUserError
  } = useUserQuery({ nextFetchPolicy: 'standby', fetchPolicy: 'no-cache' })

  const [
    loginQuery,
    { loading: loginLoader, data: loginData, error: loginApiError },
  ] = useLoginLazyQuery({ nextFetchPolicy: 'standby', fetchPolicy: 'no-cache' })

  const [
    createUserMutation,
    { loading: signUpLoader, data: signUpData, error: signUpError, reset: resetCreateUser },
  ] = useCreateUserMutation()
  
  const [
    verifyUserMutation,
    { loading: verifyUserLoader, data: verifyUserData, error: verifyUserError },
  ] = useVerifyUserMutation()
  
  const [
    logoutMutation,
    { loading: logoutLoader, data: logoutData, error: logoutError },
  ] = useLogoutMutation()

  useEffect(() => {
    setUser(checkUserData && checkUserData.user)
  }, [checkUserData])

  useEffect(() => {
    setUser(loginData && loginData.login)
  }, [loginData])

  useEffect(() => {
    setLoginError(loginApiError)
  }, [loginApiError])

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

  const googleLogin = (data: Record<string, string>) => {
    fetch(`${config.backendBaseUrl}oauth/google`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(setLoginError)
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
    client.clearStore()
    logoutMutation()
    setUser(null)
    setLoginError(null)
  }

  const contextValue: AuthContextType = {
    user,
    login,
    googleLogin,
    signup,
    verify,
    logout,
    resetCreateUser,
    checkUserLoader,
    signUpLoader,
    signUpData,
    signUpError,
    loginLoader,
    loginData,
    loginError,
    verifyUserLoader,
    verifyUserData,
    verifyUserError,
    logoutLoader,
    logoutData,
    logoutError
  }

  if (!firstCheck || checkUserLoader || logoutLoader) {
    return <Loader darkenBackground />
  }

  return <Provider value={contextValue}>{children}</Provider>
}

export const useAuthContext = (): AuthContextType | null =>
  useContext(authContext)

export default AuthProvider
