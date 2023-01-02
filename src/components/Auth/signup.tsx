import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { paths } from '../App'
import { AuthContextType, useAuthContext } from './AuthProvider'
import { Wrapper } from './styled'
import { useNotificationContext } from '../common/Notification'
import { NotificationContextType } from '../common/Notification/NotificationProvider'

interface FormData {
  userName: string
  email: string
  password: string
}

interface LoginParamsType {}

const SignUpForm: React.FC<LoginParamsType> = () => {
  const history = useHistory()
  const location = useLocation<{ from: string }>()
  const { signup, user, signUpLoader, signUpData, signUpError } = useAuthContext() as AuthContextType
  const { notification } = useNotificationContext() as NotificationContextType
  const { from } = location.state || { from: { pathname: paths.DASHBOARD } }

  useEffect(() => {
    if (user && user._id) {
      history.push(from)
    }
  }, [history, from, user])

  useEffect(() => {
    if (signUpData && signUpData.createUser) {
      notification.success({
        message: 'Signup Successful',
        placement: 'topRight'
      })

      history.push(paths.HOME)
    }
  }, [signUpData])

  useEffect(() => {
    if (signUpError) {
      notification.error({
        message: 'Signup Error',
        description: signUpError.message,
        placement: 'topRight'
      })
    }
  }, [signUpError])

  const onSubmit = (values: FormData) => {
    signup(values)
  }

  return (
    <Wrapper>
      <h2 className="header">Sign Up</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: 'Please input your UserName!' }]}
        >
          <Input
            placeholder="UserName"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
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
        <Form.Item
          name="confirm-password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please input your Password!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Confirm Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={signUpLoader}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default SignUpForm