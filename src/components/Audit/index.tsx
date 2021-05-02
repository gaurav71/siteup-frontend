import { Badge, Checkbox, Modal, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useGetSiteAuditLogsQuery } from '../../generated/graphql'
import { debounce } from '../../utilities/util'
import { cacheUpdator } from '../Apollo'
import { DashboardContextType, useDashboardContext } from '../Dashboard'
import { TableWrapper, Wrapper } from './styled'

interface Props {
  jobId: string
  onCancel: () => void
}

const columns = [
  {
    title: 'Checked On',
    dataIndex: 'createdOn',
    key: 'createdOn',
    render: (createdOn: number) => moment(createdOn).format('DD/MM/YYYY HH:mm'),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    // eslint-disable-next-line react/display-name
    render: (status: boolean) => {
      switch (status) {
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
  },
]

let lastScrollTop = 0

const AuditLog: React.FC<Props> = ({ jobId, onCancel }) => {
  const [showOnlyDown, setShowOnlyDown] = useState(false)

  const { jobsData } = useDashboardContext() as DashboardContextType

  const { loading, data, fetchMore } = useGetSiteAuditLogsQuery({
    variables: {
      jobId,
      limit: 10,
    },
  })

  const debouncedRef = useRef(
    debounce(
      (cursor: number) =>
        fetchMore({
          variables: {
            jobId,
            cursor,
            limit: 10,
          },
        }),
      200
    )
  )

  useEffect(
    () => () => {
      cacheUpdator.clearAuditCache()
    },
    [jobId]
  )

  const handleTableScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollHeight, clientHeight, scrollTop } = e.target as any
    const scrollingDown = scrollTop > lastScrollTop
    const atBottom = clientHeight + scrollTop >= scrollHeight - 1

    if (scrollingDown && atBottom) {
      debouncedRef.current(finalData[finalData.length - 1].createdOn)
    }

    lastScrollTop = scrollTop
  }

  const job = jobsData.find((job) => job._id === jobId)

  const tableData =
    (data && data.getSiteAuditLogs.map((job) => ({ ...job, key: job._id }))) ||
    []

  const finalData = showOnlyDown
    ? tableData.filter((log) => !log.status)
    : tableData

  return (
    <Modal
      title="Audit Log"
      visible={!!jobId}
      onCancel={onCancel}
      footer={null}
    >
      <Wrapper>
        <div className="header">
          <span className="url">{job && job.url}</span>
          <Checkbox
            checked={showOnlyDown}
            onChange={() => setShowOnlyDown(!showOnlyDown)}
          >
            Down Only
          </Checkbox>
        </div>
        <TableWrapper onScroll={handleTableScroll}>
          <Table
            loading={loading}
            pagination={false}
            columns={columns}
            dataSource={finalData.sort((a, b) =>
              a.createdOn < b.createdOn ? 1 : -1
            )}
          />
        </TableWrapper>
      </Wrapper>
    </Modal>
  )
}

export default AuditLog
