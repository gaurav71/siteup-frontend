import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useCheckMultipleSitesStatusMutation } from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'

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
      checkStatusData.checkMultipleSitesStatus.forEach((data) => {
        cacheUpdator.updateSiteupJob(data)
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
