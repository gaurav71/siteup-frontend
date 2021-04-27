import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Switch, Button, Row, Col, Select } from 'antd'
import { useCreateSiteUpCheckerJobMutation, useUpdateSiteUpCheckerJobMutation } from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'
import { useDashboardContext } from '../Dashboard'
import { defaultCronOptions, getHumanReadableFromCron } from './util'

const { Option } = Select

interface CreateUpdateJobProps {}

interface FormData {
  url: string;
  cron: string;
  resetAfterDownCount: number;
  sendMailOnFailure: boolean;
}

const initialValues: Partial<FormData> = {
  cron: defaultCronOptions.EVERY_TEN_MINUTES.value,
  sendMailOnFailure: false
}

const INITIAL_CRON_VALUE = ''

const CreateUpdateJob: React.FC<CreateUpdateJobProps> = () => {
  const [form] = Form.useForm()
  const [createMutation, { loading: createLoader, data: createData }] = useCreateSiteUpCheckerJobMutation()
  const [updateMutation, { loading: updateLoader, data: updateData }] = useUpdateSiteUpCheckerJobMutation()
  const { addEditJobModal, setAddEditJobModal, selectedJob } = useDashboardContext()
  const [cronValue, setCronValue] = useState<string>(INITIAL_CRON_VALUE) 
  const [customCron, setCustomCron] = useState({
    key: '',
    value: ''
  })

  useEffect(() => {
    if (addEditJobModal === 'edit') {
      form.setFieldsValue(selectedJob)
      setCronValue(selectedJob?.cron || '')
    }
  }, [addEditJobModal])

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        cron: cronValue
      })
    }
  }, [cronValue])

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

  const handleSubmit = async() => {
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
    } catch(error) { }
  }

  const resetForm = () => {
    form.resetFields()
    setCronValue(INITIAL_CRON_VALUE)
  }

  const handleCancel = () => {
    setAddEditJobModal('')
    resetForm()
  }

  const handleCronSelectChange = (value: string) => {
    setCronValue(value)
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
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={initialValues}
      >
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true }]}
        >
          <Input
            disabled={addEditJobModal === 'edit'}
          />
        </Form.Item>
        <Form.Item label="Cron">
          <Row gutter={2}>
            <Col span={10}>
              <Form.Item
                noStyle
                name="cron"
                rules={[
                  { required: true },
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
            <Col span={14}>
              <Select
                className="select-after"
                onChange={handleCronSelectChange}
                value={cronValue}
              >
                {Object.values(defaultCronOptions).map((data, index) => (
                  <Option key={index} value={data.value}>{data.key}</Option>
                ))}
                {customCron.key && (
                  <Option value={customCron.value}>{customCron.key}</Option>
                )}
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label="Reset After"
          name="resetAfterDownCount"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Send Mail"
          name="sendMailOnFailure"
          valuePropName="checked"
          rules={[{ required: true }]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUpdateJob
