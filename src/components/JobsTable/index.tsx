import React from 'react'
import moment from 'moment'
import cronstrue from 'cronstrue';
import { Maybe } from 'graphql/jsutils/Maybe'
import { Badge, Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { SiteUpCheckerJob } from '../../generated/graphql'
import { useDashboardContext } from '../Dashboard'
import CheckStatusButton from './CheckStatusButton'
import DeleteJobButton from './DeleteJobButton'
import { Wrapper } from './styled'

interface JobsTableProps {}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: SiteUpCheckerJob[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record: SiteUpCheckerJob) => ({
    disabled: false,
    _id: record._id,
  }),
}

const JobsTable: React.FC<JobsTableProps> = () => {
  const { jobsData, getJobsLoader, updateSelectedJob, setAddEditJobModal } = useDashboardContext()
  
  const handleEditButtonClick = (jobId: string) => {
    updateSelectedJob(jobsData.find((job) => job._id === jobId))
    setAddEditJobModal('edit')
  }
  
  const renderMapper = {
    cron: (cron: string) => cronstrue.toString(cron),
    siteUpOnLastChecked: (siteUpOnLastChecked: Maybe<boolean>) => {
      if (typeof siteUpOnLastChecked !== 'boolean') {
        return '-'
      }

      switch(siteUpOnLastChecked) {
        case true: return <><Badge status='success' />Active</>
        case false: return <><Badge status='error' />Down</>
      }
    },
    lastCheckedOn: (lastCheckedOn: Maybe<number>) => {
      switch(typeof lastCheckedOn) {
        case 'number': return moment(lastCheckedOn).format('DD/MM/YYYY HH:mm')
        default: return '-'
      }
    },
    edit: (_id: string) => {
      const style = { cursor: 'pointer' }
      const onClick = () => handleEditButtonClick(_id)

      return <EditOutlined style={style} onClick={onClick} />
    },
    checkNow: (_id: string) => <CheckStatusButton jobId={_id} />,
    delete: (_id: string) => <DeleteJobButton jobId={_id}>Delete</DeleteJobButton>
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
      render: renderMapper["cron"]
    },
    {
      title: 'Status',
      dataIndex: 'siteUpOnLastChecked',
      key: 'siteUpOnLastChecked',
      render: renderMapper["siteUpOnLastChecked"]
    },
    {
      title: 'Last Checked On',
      dataIndex: 'lastCheckedOn',
      key: 'lastCheckedOn',
      render: renderMapper["lastCheckedOn"]
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      key: 'edit',
      render: renderMapper["edit"]
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'checkNow',
      render: renderMapper["checkNow"]
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      key: 'delete',
      render: renderMapper["delete"]
    }
  ]
  
  return (
    <Wrapper>
      <Table<SiteUpCheckerJob>
        loading={getJobsLoader}
        pagination={false}
        dataSource={jobsData.map((job) => ({ ...job, key: job._id }))}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
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
