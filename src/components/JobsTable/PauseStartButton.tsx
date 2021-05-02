import {
  LoadingOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import React, { useEffect } from 'react'
import {
  usePauseSiteUpCheckerJobMutation,
  useStartSiteUpCheckerJobMutation,
} from '../../generated/graphql'
import { cacheUpdator } from '../Apollo'
import { ButtonWrapper } from './styled'

interface PauseStartButtonProps {
  jobId: string
  status: string
}

export const statusTypes = Object.freeze({
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED',
})

const PauseStartButton: React.FC<PauseStartButtonProps> = ({
  status,
  jobId,
}) => {
  const [
    pauseJobMutation,
    { loading: pauseJobLoader, data: pauseJobData },
  ] = usePauseSiteUpCheckerJobMutation()
  const [
    startJobMutation,
    { loading: startJobLoader, data: startJobData },
  ] = useStartSiteUpCheckerJobMutation()

  useEffect(() => {
    if (pauseJobData) {
      cacheUpdator.updateSiteupJob(pauseJobData.pauseSiteUpCheckerJob)
    }
  }, [pauseJobData])

  useEffect(() => {
    if (startJobData) {
      cacheUpdator.updateSiteupJob(startJobData.startSiteUpCheckerJob)
    }
  }, [startJobData])

  const handlePauseClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()

    pauseJobMutation({
      variables: {
        jobId,
      },
    })
  }

  const handleStartClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()

    startJobMutation({
      variables: {
        jobId,
      },
    })
  }

  const loader = pauseJobLoader || startJobLoader

  return (
    <>
      {loader ? (
        <LoadingOutlined />
      ) : (
        <>
          {status === statusTypes.RUNNING && (
            <ButtonWrapper onClick={handlePauseClick}>
              <PauseOutlined />
              <span>Pause</span>
            </ButtonWrapper>
          )}
          {status === statusTypes.PAUSED && (
            <ButtonWrapper onClick={handleStartClick}>
              <PlayCircleOutlined />
              <span>Start</span>
            </ButtonWrapper>
          )}
        </>
      )}
    </>
  )
}

export default React.memo(PauseStartButton)
