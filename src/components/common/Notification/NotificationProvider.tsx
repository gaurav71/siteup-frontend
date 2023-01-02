import React, { useMemo } from 'react';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification';

export interface NotificationContextType {
  notification: NotificationInstance
}

export const Context = React.createContext<NotificationContextType | null>(null);

const NotificationProvider: React.FC = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const contextValue: NotificationContextType = useMemo(() => ({
    notification: api
  }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {children}
    </Context.Provider>
  );
};

export default NotificationProvider;