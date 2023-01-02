import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { paths } from "../App"
import Loader from "../common/Loader"
import { useNotificationContext } from "../common/Notification"
import { NotificationContextType } from "../common/Notification/NotificationProvider"
import useSearchQuery from "../hooks/useSearchQuery"
import { AuthContextType, useAuthContext } from "./AuthProvider"

interface VerifyUserParmasType {}

const VerifyUser: React.FC<VerifyUserParmasType> = () => {
  const {
    verify,
    verifyUserLoader,
    verifyUserData,
    verifyUserError
  } = useAuthContext() as AuthContextType

  const { notification } = useNotificationContext() as NotificationContextType

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
    if (verifyUserData || verifyUserError) {
      if (verifyUserError) {
        notification.error({ message: verifyUserError.message })
      } else if (verifyUserData) {
        notification.success({ message: 'Verification Successful.' })
      }
      history.push(paths.HOME)
    }
  }, [verifyUserData, verifyUserError])

  return (
    <>
      {verifyUserLoader ? <Loader /> : null}
    </>
  )
}

export default VerifyUser