import React, { useEffect, CSSProperties, useState } from 'react'
import { Modal, Form, Input, InputNumber, Switch, Button, Row, Col } from 'antd'
import { GetUserSiteUpCheckerJobsDocument, SiteUpCheckerJob, useCreateSiteUpCheckerJobMutation, useUpdateSiteUpCheckerJobMutation } from '../../generated/graphql'
import { client } from '../Apollo'
import { useDashboardContext } from '../Dashboard'
import CronInput from './cronInput'

interface CreateUpdateJobProps {}

interface FormData {
  url: string;
  cron: string;
  resetAfterDownCount: number;
  sendMailOnFailure: boolean;
}

const CreateUpdateJob: React.FC<CreateUpdateJobProps> = () => {
  const [form] = Form.useForm()
  const [createMutation, { loading: createLoader, data: createData }] = useCreateSiteUpCheckerJobMutation()
  const [updateMutation, { loading: updateLoader, data: updateData }] = useUpdateSiteUpCheckerJobMutation()
  const { addEditJobModal, setAddEditJobModal, selectedJob } = useDashboardContext()

  useEffect(() => {
    if (addEditJobModal === 'edit') {
      form.setFieldsValue(selectedJob)
    }
  }, [addEditJobModal])

  useEffect(() => {
    if (createData) {
      const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

      client.writeQuery({
        query: GetUserSiteUpCheckerJobsDocument,
        data: {
          getUserSiteUpCheckerJobs: [
            ...data.getUserSiteUpCheckerJobs,
            createData.createSiteUpCheckerJob
          ]
        }
      })

      handleCancel()
    }
  }, [createData])

  useEffect(() => {
    if (updateData) {
      const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

      client.writeQuery({
        query: GetUserSiteUpCheckerJobsDocument,
        data: {
          getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.map((job: SiteUpCheckerJob) => (
            (job._id === updateData.updateSiteUpCheckerJob._id) ? ({
              ...job, ...updateData.updateSiteUpCheckerJob
            }) : ({
              ...job
            })
          ))
        }
      })

      handleCancel()
    }
  }, [updateData])

  const handleSubmit = () => {
    const formData: FormData = form.getFieldsValue()

    console.log(formData)

    // switch(addEditJobModal) {
    //   case 'add': {
    //     createMutation({
    //       variables: formData
    //     })
    //   }
    //   case 'edit': {
    //     if (selectedJob) {
    //       updateMutation({
    //         variables: {
    //           jobId: selectedJob._id,
    //           ...formData
    //         }
    //       })
    //     }
    //   }
    // }
  }

  const handleCancel = () => {
    setAddEditJobModal('')
    form.resetFields()
  }

  const loader = createLoader || updateLoader

  const [cronValue, setCronValue] = useState('123123')

  return (
    <Modal
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
        <Form.Item
          label="Cron"
          name="cron"
          rules={[{ required: true }]}
          valuePropName='cronValue'
        >
          <CronInput cronValue={cronValue}/>
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
