import React, { useEffect, useRef, useState } from 'react'
import { Modal, Form, Input, InputNumber, Switch, Button, Row, Col, Select } from 'antd'
import { useCreateSiteUpCheckerJobMutation, useUpdateSiteUpCheckerJobMutation } from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'
import { useDashboardContext } from '../Dashboard'
import { defaultCronOptions, getHumanReadableFromCron } from './util'
import { Wrapper } from './styled'

const { Option } = Select

interface CreateUpdateJobProps { }

interface FormData {
  url: string;
  cron: string;
  sendMailOnFailure: boolean;
  resetAfterDownCount: number | null;
}

const initialValues: FormData = {
  url: '',
  cron: '',
  sendMailOnFailure: false,
  resetAfterDownCount: null
}

const CreateUpdateJob: React.FC<CreateUpdateJobProps> = () => {
  const [form] = Form.useForm()
  const [createMutation, { loading: createLoader, data: createData }] = useCreateSiteUpCheckerJobMutation()
  const [updateMutation, { loading: updateLoader, data: updateData }] = useUpdateSiteUpCheckerJobMutation()
  const { addEditJobModal, setAddEditJobModal, selectedJob } = useDashboardContext()
  const [cronValue, setCronValue] = useState(initialValues.cron)
  const [customCron, setCustomCron] = useState({
    key: '',
    value: ''
  })

  useEffect(() => {
    if (addEditJobModal === 'edit') {
      form.setFieldsValue(selectedJob)
      setCronValue((selectedJob as any).cron)
    }
  }, [addEditJobModal])

  useEffect(() => {
    if (createData) {
      cacheUpdator.addSiteupJob(createData.createSiteUpCheckerJob)
      handleCancel()
    }
  }, [createData])

  useEffect(() => {
    if (updateData) {
      cacheUpdator.updateSiteupJob(updateData.updateSiteUpCheckerJob)
      handleCancel()
    }
  }, [updateData])

  const handleSubmit = async () => {
    try {
      const formData: FormData = await form.validateFields()
      
      if (addEditJobModal === 'add') {
        createMutation({
          variables: formData
        })
      } else {
        updateMutation({
          variables: {
            jobId: (selectedJob as any)._id,
            ...formData
          }
        })
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setAddEditJobModal('')
    setCronValue(initialValues.cron)
  }

  const handleCronInputChange = (e: any) => {
    const cronInput = e.target.value
    const readableString = getHumanReadableFromCron(cronInput)
    const cronAlreadyInDefaults = Object.values(defaultCronOptions).find(({ value }) => value === cronInput)

    if (readableString && !cronAlreadyInDefaults) {
      setCustomCron({
        key: readableString,
        value: cronInput
      })
    } else {
      setCustomCron({
        key: '',
        value: ''
      })
    }

    setCronValue(cronInput)
  }

  const loader = createLoader || updateLoader

  return (
    <Modal
      forceRender
      title={addEditJobModal === 'edit' ? 'Edit Details' : 'Add Details'}
      visible={!!addEditJobModal}
      onOk={handleSubmit}
      confirmLoading={loader}
      onCancel={handleCancel}
      width={350}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loader}
          onClick={handleSubmit}
        >
          Save
        </Button>
      ]}
    >
      <Wrapper>
        <Form
          hideRequiredMark
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item
            label="URL"
            name="url"
            rules={[{
              required: true,
              message: 'URL is required'
            }]}
          >
            <Input
              disabled={addEditJobModal === 'edit'}
            />
          </Form.Item>
          <Form.Item label="Cron">
            <Row gutter={0}>
              <Col span={10}>
              <Form.Item
                noStyle
                name="cron"
                rules={[
                  {
                    required: true,
                    message: 'cron is required'
                  },
                  {
                    validator: async (_, value) => {
                      if (value && !getHumanReadableFromCron(value)) {
                        throw new Error('Invalid cron')
                      }
                    }
                  }
                ]}
              >
                <Input
                  onChange={handleCronInputChange}
                />
              </Form.Item>
              </Col>
              <Col span={14} >
              <Select
                value={cronValue}
                onChange={(val) => {
                  form.setFieldsValue({
                    ...form.getFieldsValue(),
                    cron: val
                  })
                  setCronValue(val)
                }}
              >
                {Object.values(defaultCronOptions).map((data, index) => (
                  <Option key={index} value={data.value} >
                    {data.key}
                  </Option>
                ))}
                {customCron.key && (
                  <Option value={customCron.value} >
                    {customCron.key}
                  </Option>
                )}
              </Select>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Send mail when down"
            name="sendMailOnFailure"
            valuePropName="checked"
            rules={[{
              required: true
            }]}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => {
              return prev.sendMailOnFailure !== curr.sendMailOnFailure
            }}
          >
            {() => {
              if (!form.getFieldValue('sendMailOnFailure')) {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  resetAfterDownCount: null
                })
              }
              
              return (
                <Form.Item
                  label="Send mail after down count"
                  name="resetAfterDownCount"
                  shouldUpdate
                  hidden={!form.getFieldValue('sendMailOnFailure')}
                  rules={[{
                    validator: async (_, value) => {
                      if (form.getFieldValue('sendMailOnFailure') && typeof value !== 'number') {
                        throw new Error('Reset After is required')
                      }
                    }
                  }]}
                >
                  <InputNumber min={1}/>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default CreateUpdateJob
