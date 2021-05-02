import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { paths } from '../App'
import { AuthContextType, useAuthContext } from './AuthProvider'
import { Wrapper } from './styled'

interface FormData {
  email: string
  password: string
}

interface LoginParamsType {}

const NormalLoginForm: React.FC<LoginParamsType> = () => {
  const history = useHistory()
  const location = useLocation<{ from: string }>()
  const { login, user, loginLoader } = useAuthContext() as AuthContextType
  const { from } = location.state || { from: { pathname: paths.DASHBOARD } }

  useEffect(() => {
    if (user && user._id) {
      history.push(from)
    }
  }, [history, from, user])

  const onSubmit = (values: FormData) => {
    login(values)
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
            placeholder="Username"
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
          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
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
          {/* Or
          <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default NormalLoginForm
