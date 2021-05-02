import { Button, Form, Input, Switch } from 'antd'
import React, { useEffect } from 'react'
import { useUpdateUserMutation } from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'
import { AuthContextType, useAuthContext } from '../Auth/AuthProvider'
import { Wrapper } from './styled'

type FormData = {
  [key: string]: string
} & {
  sendMailOnFailure: boolean
}

const Profile: React.FC = () => {
  const { user } = useAuthContext() as AuthContextType
  const [updateUser, { loading, data }] = useUpdateUserMutation()

  useEffect(() => {
    if (data) {
      cacheUpdator.udpateUser(data.updateUser)
    }
  }, [data])

  const onSubmit = (values: FormData) => {
    updateUser({
      variables: {
        sendMailOnFailure: values.sendMailOnFailure,
      },
    })
  }

  return (
    <Wrapper>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        initialValues={user || undefined}
        size={'middle'}
        onFinish={onSubmit}
      >
        <Form.Item name="userName" label="UserName">
          <Input disabled />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="sendMailOnFailure"
          valuePropName="checked"
          label="Send Email Notifications"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Profile
