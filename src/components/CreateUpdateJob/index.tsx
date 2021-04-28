import React, { useEffect, useState } from 'react'
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
  const [cronValue, setCronValue] = useState<string>(initialValues.cron)
  const [sendMailValue, setSendMailValue] = useState<boolean>(initialValues.sendMailOnFailure)
  const [customCron, setCustomCron] = useState({ key: '', value: '' })

  useEffect(() => {
    if (addEditJobModal === 'edit' && selectedJob) {
      form.setFieldsValue(selectedJob)
      setCronValue(selectedJob.cron)
      setSendMailValue(selectedJob.sendMailOnFailure)
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

  useEffect(() => {
    if (form) {
      const resetAfterDownCount = sendMailValue
        ? form.getFieldValue('resetAfterDownCount')
        : null

      form.setFieldsValue({
        ...form.getFieldsValue(),
        cron: cronValue,
        sendMailOnFailure: sendMailValue,
        resetAfterDownCount
      })
    }
  }, [cronValue, sendMailValue])

  const handleSubmit = async () => {
    try {
      const formData: FormData = await form.validateFields()

      if (addEditJobModal === 'add') {
        createMutation({
          variables: formData
        })
      }

      if (addEditJobModal === 'edit' && selectedJob) {
        updateMutation({
          variables: {
            jobId: selectedJob._id,
            ...formData
          }
        })
      }
    } catch (error) { }
  }

  const handleCancel = () => {
    form.resetFields()
    setCronValue(initialValues.cron)
    setSendMailValue(initialValues.sendMailOnFailure)
    setAddEditJobModal('')
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
                  onChange={(val) => setCronValue(val)}
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
            <Switch
              onChange={(val) => setSendMailValue(val)}
            />
          </Form.Item>
          <Form.Item
            label="Send mail after down count"
            name="resetAfterDownCount"
            hidden={!sendMailValue}
            rules={[{
              validator: async (_, value) => {
                if (sendMailValue && typeof value !== 'number') {
                  throw new Error('Reset After is required')
                }
              }
            }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default CreateUpdateJob
