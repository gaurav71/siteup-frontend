import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useRemoveSiteUpCheckerJobMutation } from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'

interface DeleteJobProps {
  jobId: string
}

const DeleteJobButton: React.FC<DeleteJobProps> = ({ jobId }) => {
  const [
    deleteJobMutation,
    { loading: deleteJobLoader, data: deleteJobData },
  ] = useRemoveSiteUpCheckerJobMutation()

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    deleteJobMutation({
      variables: { jobId },
    })
  }

  useEffect(() => {
    if (deleteJobData) {
      cacheUpdator.deleteSiteupJob(jobId)
    }
  }, [jobId, deleteJobData])

  return (
    <Button danger loading={deleteJobLoader} onClick={handleClick}>
      Delete
    </Button>
  )
}

export default React.memo(DeleteJobButton)
