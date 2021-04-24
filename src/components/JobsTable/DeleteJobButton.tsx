import { Button } from 'antd'
import React, { useEffect } from 'react'
import { GetUserSiteUpCheckerJobsDocument, SiteUpCheckerJob, useCheckMultipleSitesStatusMutation, useRemoveSiteUpCheckerJobMutation } from '../../generated/graphql'
import { client } from '../Apollo'

interface DeleteJobProps {
  jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobProps> = ({ jobId }) => {
  const [deleteJobMutation, { loading: deleteJobLoader, data: deleteJobData }] = useRemoveSiteUpCheckerJobMutation()

  const handleClick = () => {
    deleteJobMutation({
      variables: { jobId }
    })
  }

  useEffect(() => {
    if (deleteJobData) {
      const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

      client.writeQuery({
        query: GetUserSiteUpCheckerJobsDocument,
        data: {
          getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.filter(
            (job: SiteUpCheckerJob) => (job._id !== jobId)
          )
        }
      })
    }
  }, [deleteJobData])
  
  return (
    <Button
      danger
      loading={deleteJobLoader}
      onClick={handleClick}
    >
        Delete
    </Button>
  )
}

export default DeleteJobButton
