/* eslint-disable react/display-name */
import React, { useState } from 'react'
import moment from 'moment'
import cronstrue from 'cronstrue'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Badge, Checkbox, Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { SiteUpCheckerJob } from '../../generated/graphql'
import { DashboardContextType, useDashboardContext } from '../Dashboard'
import CheckStatusButton from './CheckStatusButton'
import DeleteJobButton from './DeleteJobButton'
import { Header, Wrapper } from './styled'
import PauseStartButton, { statusTypes } from './PauseStartButton'
import AddNewJobButton from '../AddNewJobButton'
import AuditLog from '../Audit'

interface JobsTableProps {}

// const rowSelection = {
//   onChange: (
//     selectedRowKeys: React.Key[],
//     selectedRows: SiteUpCheckerJob[]
//   ) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows
//     )
//   },
//   getCheckboxProps: (record: SiteUpCheckerJob) => ({
//     disabled: false,
//     _id: record._id,
//   }),
// }

const JobsTable: React.FC<JobsTableProps> = () => {
  const {
    jobsData,
    getJobsLoader,
    setAddEditJobModal,
  } = useDashboardContext() as DashboardContextType
  const [auditModalJobId, setAuditModalJobId] = useState('')
  const [runningCheckbox, setRunningCheckbox] = useState(true)
  const [pausedCheckbox, setPausedCheckbox] = useState(true)

  const handleEditButtonClick = () => {
    setAddEditJobModal('edit')
  }

  const renderMapper = {
    cron: (cron: string) => cronstrue.toString(cron),
    pauseStart: (_id: string) => (
      <PauseStartButton
        jobId={_id}
        status={jobsData.find((job) => job._id === _id)?.status || ''}
      />
    ),
    siteUpOnLastChecked: (siteUpOnLastChecked: Maybe<boolean>) => {
      if (typeof siteUpOnLastChecked !== 'boolean') {
        return '-'
      }

      switch (siteUpOnLastChecked) {
        case true:
          return (
            <>
              <Badge status="success" />
              Up
            </>
          )
        case false:
          return (
            <>
              <Badge status="error" />
              Down
            </>
          )
      }
    },
    lastCheckedOn: (lastCheckedOn: Maybe<number>) => {
      switch (typeof lastCheckedOn) {
        case 'number':
          return moment(lastCheckedOn).format('DD/MM/YYYY HH:mm')
        default:
          return '-'
      }
    },
    edit: () => {
      const style = { cursor: 'pointer' }
      const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()
        handleEditButtonClick()
      }

      return <EditOutlined style={style} onClick={onClick} />
    },
    checkNow: (_id: string) => <CheckStatusButton jobId={_id} />,
    delete: (_id: string) => <DeleteJobButton jobId={_id} />,
  }

  const columns = [
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Check',
      dataIndex: 'cron',
      key: 'cron',
      render: renderMapper['cron'],
    },
    {
      title: 'Pause/Start',
      dataIndex: '_id',
      key: 'pauseStart',
      render: renderMapper['pauseStart'],
    },
    {
      title: 'Status',
      dataIndex: 'siteUpOnLastChecked',
      key: 'siteUpOnLastChecked',
      render: renderMapper['siteUpOnLastChecked'],
    },
    {
      title: 'Last Checked On',
      dataIndex: 'lastCheckedOn',
      key: 'lastCheckedOn',
      render: renderMapper['lastCheckedOn'],
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      key: 'edit',
      render: renderMapper['edit'],
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'checkNow',
      render: renderMapper['checkNow'],
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      key: 'delete',
      render: renderMapper['delete'],
    },
  ]

  const filterJobs = (job: SiteUpCheckerJob) => {
    if (job.status === statusTypes.RUNNING && runningCheckbox) return true
    if (job.status === statusTypes.PAUSED && pausedCheckbox) return true
    return false
  }

  const data = jobsData
    .filter(filterJobs)
    .map((job) => ({ ...job, key: job._id }))

  return (
    <Wrapper>
      <Header>
        <AddNewJobButton />
        <h2>Jobs</h2>
        <div className="checkbox-container">
          <Checkbox
            checked={runningCheckbox}
            onChange={() => setRunningCheckbox(!runningCheckbox)}
          >
            Running
          </Checkbox>
          <Checkbox
            checked={pausedCheckbox}
            onChange={() => setPausedCheckbox(!pausedCheckbox)}
          >
            Paused
          </Checkbox>
        </div>
      </Header>
      {auditModalJobId && (
        <AuditLog
          jobId={auditModalJobId}
          onCancel={() => setAuditModalJobId('')}
        />
      )}
      <Table<SiteUpCheckerJob>
        loading={getJobsLoader}
        pagination={false}
        dataSource={data}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        onRow={(job) => ({
          onClick: () => setAuditModalJobId(job._id),
          style: { cursor: 'pointer' },
        })}
      >
        {columns.map((col) => (
          <Table.Column<SiteUpCheckerJob>
            key={col.key}
            title={col.title}
            dataIndex={col.dataIndex}
            render={col.render}
          />
        ))}
      </Table>
    </Wrapper>
  )
}

export default JobsTable
