import React, { useCallback } from 'react'
import moment from 'moment'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { SiteUpCheckerJob } from '../../generated/graphql'
import { useDashboardContext } from '../Dashboard'
import CheckStatusButton from './checkStatusButton'
import DeleteJobButton from './DeleteJobButton'
import { DownIcon, UpIcon, Wrapper } from './styled'

interface JobsTableProps {}

const JobsTable: React.FC<JobsTableProps> = () => {
  const { jobsData, getJobsLoader, updateSelectedJob, setAddEditJobModal } = useDashboardContext()

  const handleEditButtonClick = (jobId: string) => useCallback(() => {
    updateSelectedJob(jobsData.find((job) => job._id === jobId))
    setAddEditJobModal('edit')
  }, [])
  
  const renderMapper = {
    siteUpOnLastChecked: (siteUpOnLastChecked: Maybe<boolean>) => {
      if (typeof siteUpOnLastChecked !== 'boolean') {
        return '-'
      }

      switch(siteUpOnLastChecked) {
        case true: return <UpIcon className="fas fa-check-circle" />
        case false: return <DownIcon className="fas fa-times-circle" />
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
      title: 'Cron',
      dataIndex: 'cron',
      key: 'cron',
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
      title: 'Check now',
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
  ];
  
  return (
    <Wrapper>
      <Table<SiteUpCheckerJob>
        loading={getJobsLoader}
        pagination={false}
        dataSource={jobsData}
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
