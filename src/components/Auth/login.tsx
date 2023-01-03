import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Checkbox, Typography, notification } from 'antd'
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
  const { login, loginData, loginError, loginLoader, user } = useAuthContext() as AuthContextType
  const { from } = location.state || { from: paths.DASHBOARD }

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
    if (loginData && loginData.login && user) {
      notification.success({
        message: 'Login Successful',
        placement: 'topRight'
      })
      history.push(from)
    }
  }, [history, from, loginData, user])

  useEffect(() => {
    if (loginError) {
      notification.error({
        message: 'Login Error',
        description: loginError.message,
        placement: 'topRight'
      })
    }
  }, [loginError])

  const onSubmit = (values: FormData) => {
    login(values)
  }

  const handleGoogleSignInCallback = (response: any) => {
    fetch(`${config.backendBaseUrl}oauth/google`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(response),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error)
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
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
