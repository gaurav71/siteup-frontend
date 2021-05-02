import { Form, FormInstance, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import { FormData } from './index'

interface DownCountInputProps {
  form: FormInstance<FormData>
  sendMailOnFailure: boolean
}

const DownCountInput: React.FC<DownCountInputProps> = ({
  form,
  sendMailOnFailure,
}) => {
  useEffect(() => {
    if (!sendMailOnFailure) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        resetAfterDownCount: null,
      })
    }
  }, [form, sendMailOnFailure])

  return (
    <Form.Item
      label="Send mail after down count"
      name="resetAfterDownCount"
      shouldUpdate
      hidden={!form.getFieldValue('sendMailOnFailure')}
      rules={[
        {
          validator: async (_, value) => {
            if (
              form.getFieldValue('sendMailOnFailure') &&
              typeof value !== 'number'
            ) {
              throw new Error('Reset After is required')
            }
          },
        },
      ]}
    >
      <InputNumber min={1} />
    </Form.Item>
  )
}

export default DownCountInput
