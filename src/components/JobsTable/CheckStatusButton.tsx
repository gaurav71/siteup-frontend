import { Button } from 'antd'
import React, { useEffect } from 'react'
import { GetUserSiteUpCheckerJobsDocument, SiteUpCheckerJob, useCheckMultipleSitesStatusMutation } from '../../generated/graphql'
import { client } from '../Apollo'

interface CheckStatusProps {
  jobId: string;
}

const CheckStatusButton: React.FC<CheckStatusProps> = ({ jobId }) => {
  const [checkStatusMutation, { loading: checkStatusLoader, data: checkStatusData }] = useCheckMultipleSitesStatusMutation()

  const handleClick = () => {
    checkStatusMutation({
      variables: { jobIds: [jobId] }
    })
  }

  useEffect(() => {
    if (checkStatusData) {
      const data = client.readQuery({ query: GetUserSiteUpCheckerJobsDocument })

      client.writeQuery({
        query: GetUserSiteUpCheckerJobsDocument,
        data: {
          getUserSiteUpCheckerJobs: data.getUserSiteUpCheckerJobs.map((job: SiteUpCheckerJob) => (
            (checkStatusData.checkMultipleSitesStatus.find((_job) => _job._id === job._id)) ? ({
              ...job, ...checkStatusData.checkMultipleSitesStatus.find((_job) => _job._id === job._id)
            }) : ({
              ...job
            })
          ))
        }
      })
    }
  }, [checkStatusData])
  
  return (
    <Button
      loading={checkStatusLoader}
      onClick={handleClick}
    >
        Check now
    </Button>
  )
}

export default CheckStatusButton
