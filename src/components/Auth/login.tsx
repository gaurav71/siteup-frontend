import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { paths } from '../App'
import { AuthContextType, useAuthContext } from './AuthProvider'
import { Wrapper } from './styled'
import { useNotificationContext } from '../common/Notification'
import { NotificationContextType } from '../common/Notification/NotificationProvider'
import { loadScript } from '../../utilities/util'
import { config } from '../../config/config'
const { Link } = Typography

interface FormData {
  email: string
  password: string
}

declare const google: any

interface LoginParamsType {}

const NormalLoginForm: React.FC<LoginParamsType> = () => {
  const history = useHistory()
  const googleButton = useRef(null);
  const { notification } = useNotificationContext() as NotificationContextType
  const location = useLocation<{ from: string }>()
  const { from } = location.state || { from: paths.DASHBOARD }

  const {
    login,
    googleLogin,
    loginError,
    loginLoader,
    user,
    googleLoginError
  } = useAuthContext() as AuthContextType

  useEffect(() => {
    loadScript(config.googleGSIClientScriptUrl)
      .then(() => {
        google.accounts.id.initialize({
          client_id: config.googleOauth2ClientId,
          callback: handleGoogleSignInCallback,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'filled_blue' } 
        )
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (user) {
      notification.success({
        message: 'Welcome',
        placement: 'topRight'
      })
      history.push(from)
    }
  }, [history, from, user])

  useEffect(() => {
    if (loginError) {
      notification.error({
        message: 'Login Error',
        description: loginError.message,
        placement: 'topRight'
      })
    }
  }, [loginError])

  useEffect(() => {
    if (googleLoginError) {
      notification.error({
        message: 'Login Error',
        description: googleLoginError.message || '',
        placement: 'topRight'
      })
    }
  }, [googleLoginError])

  const onSubmit = (values: FormData) => {
    login(values)
  }

  const handleGoogleSignInCallback = (response: Record<string, string>) => {
    googleLogin(response)
  }

  return (
    <Wrapper>
      <h2 className="header">Login</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            placeholder="Email"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            type="password"
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loginLoader}
          >
            Log in
          </Button>
        </Form.Item>
        <div style={{
          width: '210px',
          marginBottom: '20px'
        }} ref={googleButton}>
        </div>
        <Link onClick={() =>  history.push(paths.SIGNUP)}>
          Click here to sign up
        </Link>
      </Form>
    </Wrapper>
  )
}

export default NormalLoginForm
