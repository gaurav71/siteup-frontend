import React from 'react'
import NotificationProvider, { Context } from './NotificationProvider'

const useNotificationContext = () => React.useContext(Context)

export {
  NotificationProvider,
  useNotificationContext
}
