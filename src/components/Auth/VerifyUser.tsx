import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { paths } from "../App"
import Loader from "../common/Loader"
import useSearchQuery from "../hooks/useSearchQuery"
import { AuthContextType, useAuthContext } from "./AuthProvider"

interface VerifyUserParmasType {}

const VerifyUser: React.FC<VerifyUserParmasType> = () => {
  const {
    verify,
    verifyUserLoader,
    verifyUserSuccess,
    verifyUserError
  } = useAuthContext() as AuthContextType

  const history = useHistory()
  const query = useSearchQuery()

  useEffect(() => {
    const token = query.get('token')

    if (token) {
      verify(token)
    } else {
      history.push(paths.HOME)
    }
  }, [])

  useEffect(() => {
    if (verifyUserSuccess || verifyUserError) {
      history.push(paths.HOME)
    }
  }, [verifyUserSuccess, verifyUserError])

  return (
    <>
      {verifyUserLoader ? <Loader /> : null}
    </>
  )
}

export default VerifyUser